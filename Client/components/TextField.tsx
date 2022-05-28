import React, { useEffect, useRef, useState } from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    View,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from 'react-native'

type Props = React.ComponentProps<typeof TextInput> & {
    label: string
    errorText?: string | null
    fontSizeC?: number
}

const TextField: React.FC<Props> = (props) => {
    const {
        label,
        errorText,
        fontSizeC,
        value,
        style,
        onBlur,
        onFocus,
        ...restOfProps
    } = props
    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef<TextInput>(null)
    const focusAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value])

    let color = isFocused ? '#d20c0c' : '#B9C4CA'
    if (errorText) {
        color = '#B00020'
    }

    return (
        <View style={style}>
        <TextInput
            style={[
                styles.input,
    {
        borderColor: color,
        fontSize: fontSizeC
    },
]}
    ref={inputRef}
    {...restOfProps}
    value={value}
    onBlur={(event) => {
        setIsFocused(false)
        onBlur?.(event)
    }}
    onFocus={(event) => {
        setIsFocused(true)
        onFocus?.(event)
    }}
    />
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
    <Animated.View
        style={[
            styles.labelContainer,
    {
        transform: [
            {
                scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                }),
            },
            {
                translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                }),
            },
            {
                translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                }),
            },
        ],
    },
]}
>
    {label !== "" && (<Text
        style={[
        styles.label,
    {
        color,
    },
        ]}
        >
    {label}
    {errorText ? '*' : ''}
        </Text>)}
    </Animated.View>
    </TouchableWithoutFeedback>
    {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    )

}

    const styles = StyleSheet.create({
        input: {
            padding: 1,
            borderWidth: 2,
            borderRadius: 4,
            // fontSize: 12,
            width: '100%',
            height: '100%'
        },
        labelContainer: {
            position: 'absolute',
            paddingHorizontal: 8,
            backgroundColor: 'white',
        },
        label: {
            fontSize: 12,
        },
        error: {
            marginTop: 4,
            marginLeft: 12,
            fontSize: 12,
            color: '#B00020',
        },
    })

    export default TextField
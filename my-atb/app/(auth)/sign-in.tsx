import {Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {IUserCreate} from "@/models/account";
import {useState} from "react";
import {useRouter} from "expo-router";
import {showMessage} from "react-native-flash-message";
import {pickImage} from "@/utils/pickImage";
import images from "@/constants/images";
import FormField from "@/components/form-fields";
import CustomButton from "@/components/custom-button";

const userInitState: IUserCreate = {
    email: '',
    firstName: '',
    imageUrl: '',
    lastName: '',
    password: ''
};

const SignIn = () => {
    const [user, setUser] = useState<IUserCreate>(userInitState);
    const [errors, setErrors] = useState<string[]>([]);
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const router = useRouter();

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    const submit = async () => {
        if (errors.length !== 0) {
            showMessage({
                message: "Правильно заповніть всі поля",
                type: "info",
            });
            return;
        }
        console.log("Submit form", user);
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full gap-2 flex items-center h-full px-4 py-20"
                      style={{
                          minHeight: Dimensions.get('window').height - 100,
                      }}>

                    <FormField
                        placeholder="Вкажіть прізвище"
                        title="Прізвище"
                        value={user.lastName}
                        handleChangeText={(e) => setUser({...user, lastName: e})}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: "Прізвище є обов'язковим"
                            },
                            {
                                rule: 'min',
                                value: 2,
                                message: 'Прізвище має містити мінімум 2 символи'
                            },
                            {
                                rule: 'max',
                                value: 40,
                                message: 'Прізвище має містити максимум 40 символів'
                            }
                        ]}

                    />

                    <FormField
                        placeholder="Вкажіть ваше ім'я"
                        title="Ім'я"
                        value={user.firstName}
                        handleChangeText={(e) => setUser({...user, firstName: e})}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Ім\'я є обов\'язковим'
                            },
                            {
                                rule: 'min',
                                value: 2,
                                message: 'Ім\'я має містити мінімум 2 символи '
                            },
                            {
                                rule: 'max',
                                value: 40,
                                message: 'Ім\'я має містити максимум 40 символів '
                            }
                        ]}
                    />

                    <FormField
                        placeholder="Вкажіть пошту"
                        title="Електронна пошта"
                        value={user.email}
                        handleChangeText={(e) => setUser({...user, email: e})}
                        keyboardType="email-address"
                        rules={[
                            {
                                rule: 'required',
                                message: "Пошта є обов'язкова"
                            },
                            {
                                rule: 'regexp',
                                value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                                message: "Пошта є некоректна"
                            },
                        ]}
                        onValidationChange={validationChange}
                    />

                    <FormField
                        placeholder="Вкажіть пароль"
                        title="Пароль"

                        value={user.password}
                        handleChangeText={(e) => setUser({...user, password: e})}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Пароль є обов\'язковим'
                            },
                            {
                                rule: 'regexp',
                                value: '[0-9]',
                                message: 'Пароль має містити цифри'
                            },
                            {
                                rule: 'regexp',
                                value: '[!@#$%^&*(),.?":{}|<>]',
                                message: 'Пароль має містити спец символи '
                            },
                            {
                                rule: 'min',
                                value: 6,
                                message: 'Пароль має містити мін 6 символів'
                            },
                            {
                                rule: 'max',
                                value: 40,
                                message: 'Максимальна довжина паролю 40 символів'
                            }

                        ]}
                    />

                    <CustomButton title="Register" handlePress={() => {router.replace("/(auth)")}} containerStyles="mt-7 w-full bg-slate-500 rounded-xl" />

                    <CustomButton title="Login" handlePress={submit} containerStyles="mt-4 w-full bg-red-700 rounded-xl" />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignIn;
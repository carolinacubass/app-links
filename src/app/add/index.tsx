import { useState } from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

import { linkStorage } from "@/storage/link-storage";

import { Categories } from "@/components/categories";

import { Input } from "@/components/input";

import { Button } from "@/components/button";

export default function Add() {

    const [ category, setCategory ] = useState("")
    const [ name, setName ] = useState("")
    const [ url, setUrl ] = useState("")

    async function handleAdd() {
        try {
        if(!category) {
            return Alert.alert("Categoria", "Selecione a categoria")
        }

         if(!name.trim()) {
            return Alert.alert("Nome", "Informe o nome")
        }

          if(!url.trim()) {
            return Alert.alert("URL", "Informe a URL")
        }

        await linkStorage.save({
            id: new Date().getTime().toString(),
            name,
            url,
            category,
        })

        Alert.alert("Sucesso", "Novo link adicionado", [
            { text: "Ok", onPress: () => router.back() },
        ])

        } catch(error) {
            Alert.alert("Erro", "Não foi possível salvar o link")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]}/>
                </TouchableOpacity>

                <Text style={styles.title}>Novo</Text>
            </View>

            <Text style={styles.label}>Selecione uma categoria</Text>
            
            <Categories onChange={setCategory} selected={category}/>

            <View style={styles.form}>
            <Input placeholder="Nome" onChangeText={setName} autoCorrect={false} />
            <Input placeholder="URL" onChangeText={setUrl} autoCorrect={false} autoCapitalize="none"/>
            <Button title="Adicionar" onPress={handleAdd} />
            </View>

            <Text style={styles.title}>{name}</Text>

        </View>
    )
}
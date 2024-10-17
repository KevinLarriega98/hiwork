import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CATEGORIES = [
    {
        title: "Diseño",
        roles: [
            "Diseño Gráfico",
            "Diseño Web",
            "UX/UI",
            "Diseño Editorial",
            "Branding",
            "Ilustración",
            "Animación",
            "Storyboard",
        ],
    },
    {
        title: "Marketing",
        roles: [
            "Marketing de Contenidos",
            "SEO",
            "SEM",
            "Social Media Marketing",
            "Email Marketing",
            "Influencer Marketing",
            "Analítica de Marketing",
            "Gestión de Proyectos",
            "Project Management",
            "Gestión de Equipos Creativos",
        ],
    },
    {
        title: "Desarrollo y Tecnología",
        roles: [
            "Desarrollo Frontend",
            "Desarrollo Backend",
            "Full Stack",
            "Desarrollo de Aplicaciones",
            "Desarrollo Web",
            "Desarrollo de Videojuegos",
            "Inteligencia Artificial",
            "Realidad Aumentada",
            "Realidad Virtual",
            "Modelado 3D",
        ],
    },
    {
        title: "Otros",
        roles: [
            "Fotografía",
            "Video",
            "Edición de Vídeo",
            "Podcasting",
            "Copywriting",
            "Redacción de Contenidos",
            "UX Writing",
        ],
    },
];

interface Role {
    role: string;
    count: number;
}

interface CollapsibleTypeProps {
    handleOptionsChange: (role: string, change: number) => void;
    newProjectDataRoles: Role[];
}

export default function CollapsibleType({
    handleOptionsChange,
    newProjectDataRoles,
}: CollapsibleTypeProps) {
    const [activeSections, setActiveSections] = useState<number[]>([]);

    return (
        <View className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Accordion
                    activeSections={activeSections}
                    sections={CATEGORIES}
                    touchableComponent={TouchableOpacity}
                    renderHeader={(section, _, isActive) => (
                        <Animatable.View
                            duration={400}
                            style={{
                                borderBottomWidth: isActive ? 0 : 1,
                                borderWidth: 1,
                                borderBottomStartRadius: isActive ? 0 : 20,
                                borderBottomEndRadius: isActive ? 0 : 20,
                                borderTopStartRadius: 20,
                                borderTopEndRadius: 20,
                            }}
                            className={`p-3 flex-row items-center mt-2 ${
                                isActive ? "bg-verde_claro" : "border-gray_3"
                            }`}
                            transition="backgroundColor"
                        >
                            <Text className="text-xl font-bold">
                                {section.title}
                            </Text>
                        </Animatable.View>
                    )}
                    renderContent={(section, _, isActive) => (
                        <Animatable.View
                            duration={400}
                            style={{
                                borderTopWidth: isActive ? 0 : 1,
                                borderWidth: 1,
                                borderTopStartRadius: isActive ? 0 : 20,
                                borderTopEndRadius: isActive ? 0 : 20,
                                borderBottomStartRadius: 20,
                                borderBottomEndRadius: 20,
                            }}
                            className="p-2 bg-[#F1F1F1]"
                            transition="backgroundColor"
                        >
                            {section.roles.map((role, index) => {
                                const roleData = newProjectDataRoles.find(
                                    (r: { role: string }) => r.role === role
                                );
                                const count = roleData ? roleData.count : 0;

                                return (
                                    <View
                                        key={index}
                                        className="flex-row justify-between items-center py-2"
                                    >
                                        <Text className="text-lg">{role}</Text>
                                        <View className="flex-row items-center">
                                            {count > 0 && (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleOptionsChange(
                                                            role,
                                                            -1
                                                        )
                                                    }
                                                    className="rounded-md"
                                                >
                                                    <MaterialCommunityIcons
                                                        name="chevron-left"
                                                        color={"#004932"}
                                                        size={30}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            <Text className="px-2 py-1 bg-white rounded-full">
                                                {count}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleOptionsChange(role, 1)
                                                }
                                                className="rounded-md"
                                            >
                                                <MaterialCommunityIcons
                                                    name="chevron-right"
                                                    color={"#004932"}
                                                    size={30}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </Animatable.View>
                    )}
                    duration={400}
                    onChange={setActiveSections}
                    renderAsFlatList={false}
                />
            </ScrollView>
        </View>
    );
}

// import { View, Text, TextInput, Switch, Button, Alert } from "react-native";
// import React, { useState } from "react";
// import useAuthStore from "../../stores/useAuthStore";
// import useProjectStore from "../../stores/useProjectStore";
// import { Calendar } from "react-native-calendars";

// type MarkedDatesType = {
//     [key: string]: {
//         color: string;
//         textColor: string;
//         startingDay?: boolean;
//         endingDay?: boolean;
//     };
// };

// const NewProjectONG = () => {
//     const { user, currentUser } = useAuthStore();

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [objectiveTimeline, setObjectiveTimeline] = useState<string[]>([]);
//     const [remote, setRemote] = useState(false);

//     const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
//     const [isStartDatePicked, setIsStartDatePicked] = useState<boolean>(false);
//     const [startDate, setStartDate] = useState<string>("");

//     const { createProject } = useProjectStore((state) => ({
//         createProject: state.createProject,
//     }));

//     const convertToObject = (array: string[]) => {
//         return array.map((date) => ({
//             date: date,
//             name: "Evento",
//             data: "lorem ipsum dolor sit amet",
//             height: 0,
//             day: "",
//         }));
//     };

//     const handleCreateProject = async () => {
//         if (!title || !description || objectiveTimeline.length === 0) {
//             Alert.alert(
//                 "Error",
//                 "Please fill out all fields and select a date range."
//             );
//             return;
//         }

//         let objectiveTimelineObjects = convertToObject(objectiveTimeline);

//         try {
//             await createProject(
//                 user?.uid || "",
//                 currentUser?.name || "",
//                 title,
//                 description,
//                 objectiveTimelineObjects,
//                 remote
//             );

//             Alert.alert("Success", "Proyecto creado exitosamente");
//             resetForm();
//         } catch (error) {
//             Alert.alert("Error", "Failed to create project.");
//             console.error("Error creating project:", error);
//         }
//     };

//     const resetForm = () => {
//         setTitle("");
//         setDescription("");
//         setObjectiveTimeline([]);
//         setRemote(false);
//         setMarkedDates({});
//         setIsStartDatePicked(false);
//         setStartDate("");
//     };

//     const onDayPress = (day: any) => {
//         if (!isStartDatePicked) {
//             setIsStartDatePicked(true);
//             setStartDate(day.dateString);
//             setMarkedDates({
//                 [day.dateString]: {
//                     startingDay: true,
//                     color: "blue",
//                     textColor: "white",
//                 },
//             });
//         } else {
//             const endDate = day.dateString;
//             const range = getDateRange(startDate, endDate);

//             const rangeObject = range.reduce<MarkedDatesType>(
//                 (acc, date, index) => {
//                     acc[date] = {
//                         color: "blue",
//                         textColor: "white",
//                         startingDay: index === 0,
//                         endingDay: index === range.length - 1,
//                     };
//                     return acc;
//                 },
//                 {}
//             );

//             setMarkedDates(rangeObject);
//             setObjectiveTimeline(range);
//             setIsStartDatePicked(false);
//         }
//     };

//     const getDateRange = (start: string, end: string): string[] => {
//         const range: string[] = [];
//         let current = new Date(start);
//         const endDate = new Date(end);

//         while (current <= endDate) {
//             range.push(current.toISOString().split("T")[0]);
//             current.setDate(current.getDate() + 1);
//         }

//         return range;
//     };

//     return (
//         <View>
//             <Text className="text-xl font-bold mb-4">Create New Project</Text>
//             <TextInput
//                 className="border p-2 mb-4"
//                 placeholder="Title"
//                 value={title}
//                 onChangeText={setTitle}
//             />
//             <TextInput
//                 className="border p-2 mb-4"
//                 placeholder="Description"
//                 value={description}
//                 onChangeText={setDescription}
//             />

//             <Calendar
//                 markingType={"period"}
//                 markedDates={markedDates}
//                 onDayPress={onDayPress}
//             />
//             <Text>
//                 {objectiveTimeline.length > 0
//                     ? `Selected dates: ${objectiveTimeline.join(", ")}`
//                     : "No dates selected"}
//             </Text>
//             <View className="flex-row items-center mb-4">
//                 <Text className="mr-2">Remote:</Text>
//                 <Switch value={remote} onValueChange={setRemote} />
//             </View>
//             <Button title="Create Project" onPress={handleCreateProject} />
//         </View>
//     );
// };

// export default NewProjectONG;

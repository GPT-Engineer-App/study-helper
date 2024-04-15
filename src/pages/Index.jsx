import React, { useState } from "react";
import { Box, Heading, Text, VStack, Button, Textarea, Checkbox, Divider, useToast } from "@chakra-ui/react";
import { FaBook, FaCheck, FaTimes } from "react-icons/fa";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const toast = useToast();

  const handleAddFlashcard = () => {
    if (topic.trim() !== "" && notes.trim() !== "") {
      setFlashcards([...flashcards, { topic, notes }]);
      setTopic("");
      setNotes("");
      toast({
        title: "Flashcard added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleStudy = () => {
    if (flashcards.length > 0) {
      setCurrentCard(flashcards[Math.floor(Math.random() * flashcards.length)]);
      setShowAnswer(false);
    }
  };

  const handleRemoveCard = () => {
    setFlashcards(flashcards.filter((card) => card !== currentCard));
    setCurrentCard(null);
  };

  return (
    <Box p={8}>
      <Heading mb={8} textAlign="center">
        <FaBook /> Study Helper
      </Heading>

      <VStack spacing={4} align="stretch">
        <Heading size="md">Create Flashcard</Heading>
        <Text>Topic:</Text>
        <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter topic" />
        <Text>Notes:</Text>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter notes" />
        <Button onClick={handleAddFlashcard} colorScheme="blue">
          Add Flashcard
        </Button>
      </VStack>

      <Divider my={8} />

      <VStack spacing={4} align="stretch">
        <Heading size="md">Study Flashcards</Heading>
        <Text>Total Flashcards: {flashcards.length}</Text>
        <Button onClick={handleStudy} colorScheme="green">
          Study Random Flashcard
        </Button>

        {currentCard && (
          <Box borderWidth={1} borderRadius="md" p={4}>
            <Heading size="sm">{currentCard.topic}</Heading>
            <Checkbox isChecked={showAnswer} onChange={(e) => setShowAnswer(e.target.checked)}>
              Show Answer
            </Checkbox>
            {showAnswer && <Text mt={2}>{currentCard.notes}</Text>}
            <Button onClick={handleRemoveCard} mt={4} leftIcon={<FaTimes />} colorScheme="red" size="sm">
              Remove Card
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;

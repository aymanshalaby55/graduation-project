"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function HowItWorks() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold font-sans">
        How This System Works
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      <div className="bg-secondary p-8 md:p-14 rounded-3xl mb-4">
        <p className=" text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold">
            Add Video Selector Node
          </span>{" "}
          Begin by adding the Video Selector node to your pipeline. This node
          allows you to select and import videos that you want to analyze.
          Simply drag and drop the Video Selector node from the node menu onto
          your workspace.
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Select Your Videos
          </span>{" "}
          Once the Video Selector node is placed, click on it to open the file
          browser. You can select one or multiple videos that you want to
          process. The system supports common video formats like MP4, AVI, and
          MOV.
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Choose Model Category
          </span>{" "}
          Browse through our diverse categories of AI models - from object
          detection to action recognition. Each category is designed for
          specific types of video analysis tasks. Select the one that best
          matches your needs.
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Select Specific Model
          </span>{" "}
          After choosing a category, you&apos;ll see a list of available models
          within that category. Each model has its own specifications and use
          cases. Pick the model that best suits your analysis requirements.
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Add Analyze Button Node
          </span>{" "}
          Connect your pipeline by adding the Analyze Button node. This node
          acts as the trigger for your analysis process. Make sure it&apos;s
          properly connected to both your Video Selector and Model nodes.
        </p>
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Start Analysis
          </span>{" "}
          With everything set up, click the Analyze button to begin processing
          your videos. The system will run your selected videos through the
          chosen AI model and provide you with detailed analysis results.
        </p>
      </div>
    </>
  );
};

const data = [
  {
    category: "Step 1",
    title: "Add Video Selector Node To Your Pipeline",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Step 2",
    title: "Choose The Videos You Want To Process",
    content: <DummyContent />,
  },
  {
    category: "Step 3",
    title: "Choose whichever Model Category You Want To Use",
    content: <DummyContent />,
  },

  {
    category: "Step 4",
    title: "After Choosing The Category Now Select The Model",

    content: <DummyContent />,
  },
  {
    category: "Step 5",
    title: "Now Drag The Analyze Button Node To The Pipeline",

    content: <DummyContent />,
  },
  {
    category: "Step 6",
    title: "Now Analyze Your Videos.",

    content: <DummyContent />,
  },
];

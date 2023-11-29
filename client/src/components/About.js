import React from "react";
import logo from "../logo.jpg";

const About = () => {
  return (
    <>
      <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 mt-8">
        <header className="text-3xl font-medium mb-4">About Us</header>
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:items-start">
          <div className="lg:mr-4 max-w-3xl">
            <p>
              Welcome to PromptAI – a creative space where inspiration knows no
              bounds! Our platform is designed to foster creativity, encourage
              storytelling, and connect users through a shared passion for
              prompts.
            </p>
            <p className="my-4">
              <div className="text-xl font-medium my-2">What is PromptAI?</div>
              At PromptAI, we believe in the power of words and the magic they
              create. Our platform serves as a hub for users to share, discover,
              and be inspired by a wide array of prompts. Whether you're an
              aspiring writer, a seasoned storyteller, or someone seeking a
              daily dose of creativity, PromptSharing is your go-to destination.
            </p>
            <p>
              <div className="text-xl font-medium my-2">What We Offer:</div>
              <ol className="list-decimal ml-8">
                <li className="mb-2">
                  <span className="font-medium">Create and Share: </span>
                  Unleash your creativity by crafting unique prompts that spark
                  the imagination. Share your prompts with the community and
                  watch as others draw inspiration from your ideas.
                </li>
                <li className="mb-2">
                  <span className="font-medium">
                    Discover New Perspectives::{" "}
                  </span>
                  Explore a world of creativity by discovering prompts from
                  fellow users. Whether you're an artist, writer, or simply
                  seeking inspiration, our platform offers a rich tapestry of
                  ideas waiting to be explored.
                </li>
                <li className="mb-2">
                  <span className="font-medium">Copy and Share: </span>
                  Found a prompt that resonates with you? Copy it with a click
                  and share it across various platforms. Encourage others to
                  join the creative journey by spreading the inspiration.
                </li>
                <li className="mb-2">
                  <span className="font-medium">
                    Connect with Like-Minded Individuals:{" "}
                  </span>
                  Engage with a community of passionate individuals who share
                  your love for creativity. Follow your favorite creators,
                  participate in discussions, and build connections with
                  like-minded individuals.
                </li>
                <li className="mb-2">
                  <span className="font-medium">Express Yourself: </span>{" "}
                  Whether you're a seasoned creator or just starting, our
                  platform provides a space for everyone to express themselves.
                  From writing prompts to visual ideas, there's no limit to the
                  ways you can showcase your creativity.
                </li>
              </ol>
            </p>
          </div>
          <div className="lg:ml-4 mt-4 lg:mt-0">
            <img src={logo} alt="" className="h-56" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

// src/Components/ImageClassifier/ImageClassifier.jsx

import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const URL = "/src/Components/ImageClassifier/my_model/";

const ImageClassifier = ({ image }) => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const classifyImage = async () => {
      if (image) {
        try {
          const modelURL = `${URL}model.json`;
          const metadataURL = `${URL}metadata.json`;
          const model = await tmImage.load(modelURL, metadataURL);

          const imgElement = new Image();
          imgElement.src = image;
          imgElement.onload = async () => {
            const prediction = await model.predict(imgElement);
            displayPredictions(prediction);
          };
        } catch (error) {
          console.error("Erro ao carregar o modelo ou fazer predição:", error);
        }
      }
    };

    classifyImage();
  }, [image]);

  const displayPredictions = (prediction) => {
    const results = prediction.map(
      (pred) => `${pred.className}: ${pred.probability.toFixed(2)}`
    );
    setPredictions(results);
  };

  return (
    <div>
      <h2>Resultados da Predição</h2>
      <div id="label-container">
        {predictions.length > 0 ? (
          predictions.map((prediction, index) => (
            <div key={index}>{prediction}</div>
          ))
        ) : (
          <p>Selecione uma imagem para ver a previsão</p>
        )}
      </div>
    </div>
  );
};

export default ImageClassifier;

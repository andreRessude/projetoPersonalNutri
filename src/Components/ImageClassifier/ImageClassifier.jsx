import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const URL = "/src/Components/ImageClassifier/my_model/";

const ImageClassifier = ({ image, onDishIdentified }) => {
  // armazenar previsões retornadas pelo model
  const [predictions, setPredictions] = useState([]);

  // chama a funcao de classificacao toda vez que uma nova imagem é fornecida
  useEffect(() => {
    const classifyImage = async () => {
      if (image) { // verifica se existe uma imagem para classificar
        try {
        // url para o modfel e metadata da IA
          const modelURL = `${URL}model.json`;
          const metadataURL = `${URL}metadata.json`;
          const model = await tmImage.load(modelURL, metadataURL); // carrega o model

          const imgElement = new Image();
          imgElement.src = image;
          imgElement.onload = async () => {
            const prediction = await model.predict(imgElement); // faz a predict
            handlePrediction(prediction); // processa a predict
          };
        } catch (error) {
          console.error("Erro ao carregar o model ou fazer a predict:", error);
        }
      }
    };

    classifyImage();
  }, [image]);

  // funçao que mapeia os nomes previstos para nomes na api
  const mapDishName = (predictedDish) => {
    const dishMapping = {
      "Strogonoff": "Estrogonofe de Frango",
      "Feijoada": "Feijoada",
      "Macarrão": "Macarrão com Molho de Tomate"
    };

    return dishMapping[predictedDish] || predictedDish; // retorna o nome mapeado ou o original
  };

  // acha o prato com maior probabilidade
  const handlePrediction = (prediction) => {
    const highestPrediction = prediction.reduce((max, item) =>
      item.probability > max.probability ? item : max
    );

    const identifiedDish = mapDishName(highestPrediction.className);
    setPredictions([`${identifiedDish}: ${highestPrediction.probability.toFixed(2)}`]);
    onDishIdentified(identifiedDish);
  };

  return (
    <div className="predictionContainer">
      <h2>Resultados da Predição</h2>
      {predictions.length > 0 ? (
        <p className="identifiedDish">Prato identificado: {predictions[0]}</p>
      ) : (
        <p className="textPlaceholder">Selecione uma imagem para ser identificada</p>
      )}
    </div>
  );
};

export default ImageClassifier;

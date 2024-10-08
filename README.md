1. Baixar os arquivos PersonalNutri e Api que estão no Zip;
2. Primeiro abrir a API no vscode, abrir o e colocar rodar a api com o comando: 'node index.js', assim a api vai rodar na porta 3000. 
3. Abrir o PersonalNutri em outra aba e ir no arquivo api.jsx localizado em 'src/Services/api/api.jsx' e alterar o endereço ip para o seu endereço (colocar comando 'ipconfig' no cmd);
4. Abrir o terminal do PersonalNutri e  rodar com o comando: 'npm run dev';

Após isso é para o aplicativo estar funcionando com as telas: Home, TelaPrato e TelaCamera. A Home vai ser uma tela com todos os pratos cadastrados e com a opção de pesquisa de pratos na barra de pesquisa. Ao clicar em um card, você irá para a TelaPrato que mostrará as informações do prato selecionado. Na Home, também há um botão de câmera que levará para a TelaCamera que possibilitaria o usuário a tirar uma foto do prato que deseja consultar (mas como não tem como utilizar a camera realmente, fizemos uma adaptação).
import { writeFile } from "fs";

const produto = {
    name: "produto",
    price: 182,
    discount: 0.2,
};


writeFile(`archive.json`, JSON.stringify(produto), (err) => {
    console.log(err || "Arquivo salvo com sucesso!");
});

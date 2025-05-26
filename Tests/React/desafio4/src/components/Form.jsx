import { useState } from "react";
import FormField from "./FormField";

const Form = ({ user, onSubmit }) => {
    const [bio, setBio] = useState(user.bio || "");
    const [name, setName] = useState(user.name || "");
    const [nick, setNick] = useState(user.nick || "");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setName(value);
        if (name === "nick") setNick(value);
        if (name === "bio") setBio(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, nick, bio }); // Envia os dados atualizados para o App
    };

    return (
        <section
            style={{
              padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "5px 5px 25px rgba(12,130,252,0.5)",
                height: "fit-content",
            }}
        >
            <form onSubmit={handleSubmit}>
                <FormField
                    name="name"
                    label="Nome"
                    value={name}
                    onChange={handleChange}
                />
                <FormField
                    name="nick"
                    label="Nick"
                    value={nick}
                    onChange={handleChange}
                />
                <FormField
                    name="bio"
                    label="Bio"
                    value={bio}
                    onChange={handleChange}
                />
                <button type="submit" style={{backgroundColor: "rgba(12,130,252,0.5)", padding: "1rem", cursor: "pointer", borderRadius: "15px"}}>Atualizar</button>
            </form>
        </section>
    );
};

export default Form;

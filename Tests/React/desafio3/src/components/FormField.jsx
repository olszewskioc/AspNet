const FormField = ({ name, label, value, onChange }) => (
    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '20px', alignItems: 'flex-start', width: '20rem'}}>
        <label>{label}</label>
        {name != "bio" ? <input type="text" name={name} value={value} onChange={onChange} style={{border: '1px solid #33a3f5', borderRadius: '15px', textAlign: 'center', height: '2rem', width: '100%'}} />
        : <textarea name={name} id={name} value={value} onChange={onChange} style={{border: '1px solid #33a3f5', borderRadius: '15px', textAlign: 'center', height: '10rem', width: '100%'}}></textarea>}
    </div>
);

export default FormField;

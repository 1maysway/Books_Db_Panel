// import React, { useState } from 'react';
// import { Button, TextField } from '@mui/material';

// type FieldValues = Record<string, any>;

// interface FieldConfig {
//   label: string;
//   validation?: (value: any) => string | null;
// }

// interface Fields {
//     [key: string]: FieldConfig;
//   }

//   interface Props {
//     onSubmit: (formData: FormData) => void;
//     initialData: Record<string, any>;
//   }

// export function generateFieldsFromData(data: Record<string, any>): Fields {
//     const fields: Fields = {};
//     for (const key in data) {
//       if (Object.prototype.hasOwnProperty.call(data, key)) {
//         const fieldConfig: FieldConfig = {
//           label: key[0].toUpperCase() + key.slice(1),
//         };
//         if (typeof data[key] === 'number') {
//           fieldConfig.validation = (value: any) =>
//             typeof value !== 'number' ? 'Enter a valid number' : null;
//         } else if (typeof data[key] === 'string') {
//           if (data[key] instanceof Date) {
//             fieldConfig.validation = (value: any) =>
//               isNaN(Date.parse(value)) ? 'Enter a valid date (dd.mm.yyyy)' : null;
//           } else {
//             fieldConfig.validation = (value: any) =>
//               typeof value !== 'string' ? 'Enter a valid string' : null;
//           }
//         } else if (Array.isArray(data[key])) {
//           fieldConfig.validation = (value: any) =>
//             !Array.isArray(value) ? 'Enter a valid array' : null;
//         } else if (data[key] instanceof Date) {
//           fieldConfig.validation = (value: any) =>
//             isNaN(Date.parse(value)) ? 'Enter a valid date (dd.mm.yyyy)' : null;
//         }
//         fields[key] = fieldConfig;
//       }
//     }
//     return fields;
//   }

//   function Form({ onSubmit, initialData }: Props) {
//     const [formData, setFormData] = React.useState<Record<string, any>>(initialData);
//     const fields = generateFieldsFromData(initialData);
  
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       const form = new FormData(event.currentTarget);
      
//       onSubmit(form);
//     };
  
//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = event.target;
//       setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         {Object.entries(fields).map(([key, { label, validation }]) => (
//           <TextField
//             key={key}
//             name={key}
//             label={label}
//             value={formData[key]}
//             onChange={handleInputChange}
//             error={Boolean(validation && validation(formData[key]))}
//             helperText={validation && validation(formData[key])}
//           />
//         ))}
//         <Button type="submit">Submit</Button>
//       </form>
//     );
//   }

// export default Form;



import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import "../scss/Components/_Form.scss";


type FieldValues = Record<string, any>;

interface FieldConfig {
  label: string;
  validation?: (value: any) => string | null;
  name:string;
}

interface Fields {
  [key: string]: FieldConfig;
}

interface Props {
  onSubmit: (formData: Record<string, any>) => void;
  initialData: Record<string, any>;
  emptyAtFisrt?:boolean;
}

export function generateFieldsFromData(data: Record<string, any>): Fields {
  const fields: Fields = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const fieldConfig: FieldConfig = {
        label: key[0].toUpperCase() + key.slice(1),name:key
      };
      if (typeof data[key] === 'number') {
        fieldConfig.validation = (value: any) =>
          typeof value !== 'number' ? 'Enter a valid number' : null;
      } else if (typeof data[key] === 'string') {
        if (data[key] instanceof Date) {
          fieldConfig.validation = (value: any) =>
            isNaN(Date.parse(value)) ? 'Enter a valid date (dd.mm.yyyy)' : null;
        } else {
          fieldConfig.validation = (value: any) =>
            typeof value !== 'string' ? 'Enter a valid string' : null;
        }
      } else if (Array.isArray(data[key])) {
        fieldConfig.validation = (value: any) =>
          !Array.isArray(value) ? 'Enter a valid array' : null;
        // добавляем ключ с [] для обработки массивов
        // fields[`${key}[]`] = fieldConfig;
        // continue;
        fieldConfig.name=`${key}[]`;
      } else if (data[key] instanceof Date) {
        fieldConfig.validation = (value: any) =>
          isNaN(Date.parse(value)) ? 'Enter a valid date (dd.mm.yyyy)' : null;
      }
      fields[key] = fieldConfig;
    }
  }
  return fields;
}

function Form({ onSubmit, initialData,emptyAtFisrt=false }: Props) {

  const [formData, setFormData] = React.useState<Record<string, any>>(initialData);
  const fields = generateFieldsFromData(initialData);

  useEffect(()=>{
    if(emptyAtFisrt){
      const convertedFormData={...formData};
      Object.keys(convertedFormData).forEach(function(key, index) {
        convertedFormData[key] ='';
      });
      setFormData(convertedFormData)
    }
  },[])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    // преобразуем массивы в формат, который будет легче обработать на сервере

    for (const key of form.entries()) { //Object.keys(formData)

      const [fieldName,fieldValue]=key;
      const isArray = fieldName.endsWith('[]');
      const name = isArray ? fieldName.slice(0, -2) : fieldName;
      const values = form.getAll(fieldName).toString();

      if (isArray) {
        formData[name] = values.split(',');
      } else {
        formData[name] = values;
      }
    }
    onSubmit(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData((prevFormData) => ({ ...prevFormData, [name.endsWith('[]')?name.slice(0,-2):name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.entries(fields).map(([key, { label, validation,name }]) => (
        <TextField
          key={key}
          name={name}
          label={label}
          value={formData[key]}
          onChange={handleInputChange}
          error={Boolean(validation && validation(formData[key]))}
          helperText={validation && validation(formData[key])}
          className='form_textField'
          required
        />
      ))}
      <Button type="submit" className='form_submit_button' size='large'>Submit</Button>
    </form>
  );
}

export default Form;

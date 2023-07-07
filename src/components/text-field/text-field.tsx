import React from 'react'
import { TextFeildProps } from './text-field.props'
import {useField,FieldHookConfig,ErrorMessage} from "formik"

const  TextFeild = ({...props}:TextFeildProps & FieldHookConfig<string>) => {
    const [field, meta, helpers] =useField(props)
 

  return (
 
        <>
          <label className={`inline-block w-full ${meta.touched && meta.error && 'border-red-500 border-2'}`}>
            <input   className="input" {...props}{...field} />

          </label>
          <p className=' text-red-500'>
          <ErrorMessage name={field.name}/>
          </p>
        </>
   
  )
}

export default  TextFeild
import {useFormik} from 'formik';
import * as yup from 'yup'; //biblioteca para validar os campos
import axios from 'axios';

//Componente input
const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-birdBlue"/>
);

// Bloco de validações do formulario usando para isso o yup.
const validationSchema = yup.object().shape({
    email: yup.string().required("Digite seu email").email("Email inválido"),
    password: yup.string().required("Digite sua senha")
});

export function Login({signInUser}) {
    const formik = useFormik({
        // Função que será chamada quando o formulário for submetido
        onSubmit: async values => { 
            const res = await axios.get('http://localhost:9901/login', {
                auth: {
                    username: values.email,
                    password: values.password,
                }
            })

            signInUser(res.data);
        },
        // Valores iniciais dos campos
        initialValues: {
            email: '',
            password: '',
        },
        
        validateOnMount: true,// Quando o formulario for montado, validar os campos
        validationSchema,// Validação dos campos
        
    });

    return(
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
            <h1 className="text-3xl">Acesse sua conta</h1>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div className='space-y-2'>
                    <Input 
                        type='text'
                        name='email' 
                        placeholder="E-mail"
                        value= {formik.values.email}
                        onChange={formik.handleChange}// para pegar o que foi digitado no input
                        onBlur={formik.handleBlur}// evento que será feito a verificação do campo
                        disabled={formik.isSubmitting}// para desabilitar o campo enquanto o formulário estiver sendo enviado
                    />
                    {(formik.touched.email && formik.errors.email) && ( 
                        <div className='text-red-500 pl-2'>{formik.errors.email}</div>
                    )}
                </div>

                <div className='space-y-2'>
                    <Input 
                        type = 'password'
                        name='password' 
                        placeholder="Senha"
                        value= {formik.values.password}
                        onChange={formik.handleChange}// para pegar o que foi digitado no input
                        onBlur={formik.handleBlur}// evento que será feito a verificação do campo
                        disabled={formik.isSubmitting}// para desabilitar o campo enquanto o formulário estiver sendo enviado
                    />
                    {(formik.touched.password && formik.errors.password) && ( 
                        <div className='text-red-500 pl-2'>{formik.errors.password}</div>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg" 
                    disabled={formik.isSubmitting || !formik.isValid }
                >
                   {formik.isSubmitting ? 'Enviando...': 'Entrar'}
                </button>
                
            </form>
            <span className="text-sm text-silver text-center">
                Não tem conta? 
                <a className="text-birdBlue" href="/signup"> Cadastre-se.</a>
            </span>
        </div>
    )
}
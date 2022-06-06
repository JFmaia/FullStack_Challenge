import {useFormik} from 'formik';
import * as yup from 'yup'; //biblioteca para validar os campos
import axios from 'axios'; // biblioteca para fazer chamadas http

//Componente input
const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-birdBlue"/>
);

// Bloco de validações do formulario usando para isso o yup.
const validationSchema = yup.object().shape({
    name: yup.string().required("Digite seu nome"),
    username: yup.string().required("Digite um nome de usuário"),
    email: yup.string().required("Digite seu email").email("Email inválido"),
    password: yup.string().required("Digite sua senha"),
});

export function Signup({signUpUser}) {
    const formik = useFormik({
        // Função que será chamada quando o formulário for submetido
        onSubmit: async values => { 
            const res = await axios.post('http://localhost:9901/signup', 
                {
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }
            );

            signUpUser(res.data);
        },

        // Valores iniciais dos campos
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
        
        validateOnMount: true,// Quando o formulario for montado, validar os campos
        validationSchema,// Validação dos campos
        
    });

    return(
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
            <h1 className="text-3xl">Crie a sua conta</h1>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>

                <div className='space-y-2'>
                    <Input 
                        type='text'
                        name='name' 
                        placeholder="Nome"
                        value= {formik.values.name}
                        onChange={formik.handleChange}// para pegar o que foi digitado no input
                        onBlur={formik.handleBlur}// evento que será feito a verificação do campo
                        disabled={formik.isSubmitting}// para desabilitar o campo enquanto o formulário estiver sendo enviado
                    />
                    {(formik.touched.name && formik.errors.name) && ( 
                        <div className='text-red-500 pl-2'>{formik.errors.name}</div>
                    )}
                </div>

                <div className='space-y-2'>
                    <Input 
                        type='text'
                        name='username' 
                        placeholder="Nome de usuário"
                        value= {formik.values.username}
                        onChange={formik.handleChange}// para pegar o que foi digitado no input
                        onBlur={formik.handleBlur}// evento que será feito a verificação do campo
                        disabled={formik.isSubmitting}// para desabilitar o campo enquanto o formulário estiver sendo enviado
                    />
                    {(formik.touched.username && formik.errors.username) && ( 
                        <div className='text-red-500 pl-2'>{formik.errors.username}</div>
                    )}
                </div>

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
                    {formik.isSubmitting ? 'Cadastrando...': 'Cadastrar'}
                </button>

            </form>
            <span className="text-sm text-silver text-center">
                Já tem uma conta? 
                <a className="text-birdBlue" href="/login"> Acesse.</a>
            </span>
        </div>
    )
}
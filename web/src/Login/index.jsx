export function Login(){
    return(
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
            <h1 className="text-3xl">Acesse sua conta</h1>

            <form className="space-y-6">
                <input 
                    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg"
                    placeholder="Email"
                />
                <input 
                    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg"
                    placeholder="Senha"                
                />
                <button 
                    className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg" 
                    >Entrar
                </button>
            </form>
            <span className="text-sm text-silver text-center">
                Não tem conta? 
                <a className="text-birdBlue" href="/"> Cadastre-se</a>
            </span>
        </div>
    )
}
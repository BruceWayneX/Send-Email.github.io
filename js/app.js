document.addEventListener('DOMContentLoaded',function(){
    
    //seleccionar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCC = document.querySelector('#cc');
    const formulario = document.querySelector('#formulario');
    //const botonEnviar =  document.querySelector('button, [type=submit], .bg-pink-600');
    const botonEnviar =  document.querySelector('#formulario button[type=submit]');
    const botonReset =  document.querySelector('#formulario button[type=reset]');

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputCC.addEventListener('input', comprobarCC);

    botonReset.addEventListener('click',resetearFormulario);

    formulario.addEventListener('submit',enviarEmail);

    function validar(e){

        limpiarAlerta(e.target.parentElement);

        email[e.target.id] = e.target.value.trim().toLowerCase();

        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement,'error');
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido',e.target.parentElement,'error');
            comprobarEmail();
            return;
        }

        comprobarEmail();
        console.log(email)
        
    }

    function mostrarAlerta(mensaje,referencia,tipo){

        limpiarAlerta(referencia);

        const alerta = document.createElement('p');
        alerta.textContent = mensaje;

        if(tipo === 'error'){
            alerta.classList.add('error','bg-red-600','text-white','p-2','text-center','font-bold','uppercase');
        }else{
            alerta.classList.add('error','bg-green-500','text-white','p-2','text-center','font-bold','uppercase');
        }
        

        //Insertar al formulario
        referencia.appendChild(alerta);

    }

    function validarEmail(email){

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }
    
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.error');
        if(alerta){
            alerta.remove();
        }
    }
    
    function comprobarEmail(){
        
        if(!Object.values(email).includes('')){
            botonEnviar.classList.remove('opacity-50');
            botonEnviar.disabled = false;
        }else{
            // console.log('Holi')
            botonEnviar.classList.add('opacity-50');
            botonEnviar.disabled = true;
        }
    }
    
    function resetearFormulario(){
        limpiarAlerta(inputEmail.parentElement);
        limpiarAlerta(inputAsunto.parentElement);
        limpiarAlerta(inputMensaje.parentElement);

        email.email = '';
        email.asunto = '';
        email.mensaje = '';
    }

    function enviarEmail(e){
        e.preventDefault();
        
        const spinner = document.createElement('div');
        spinner.classList.add('sk-circle');
        spinner.innerHTML = `
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        `;

        formulario.appendChild(spinner);

        setTimeout(() => {
            spinner.remove();
            mostrarAlerta('Mensaje enviado',formulario);
            setTimeout(() => {
                limpiarAlerta(formulario);
            }, 3000);
        }, 3000);

        formulario.reset();
        resetearFormulario();
    }

    function comprobarCC(e){
        
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        if(e.target.value === ''){
            delete email.cc;
            limpiarAlerta(inputCC.parentElement);
            comprobarEmail();
            return;
        }
        
        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido',e.target.parentElement,'error');
            email.cc = '';
            comprobarEmail();
        }else{
            limpiarAlerta(inputCC.parentElement);
        }
        
        //console.log(email)
    }

});
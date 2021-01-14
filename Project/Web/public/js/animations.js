window.lottieAnimation = bodymovin.loadAnimation({
    container: animation, // ID del div
    path: '/EcoProgress/Project/Web/public/media/animacion.json', // Ruta fichero .json de la animación
    renderer: 'svg', // Requerido
    loop: true, // Opcional
    autoplay: false, // Opcional
})

function playAnimation(){
    window.lottieAnimation.play();
}

function stopAnimation(){
    window.lottieAnimation.stop();
    window.lottieAnimation.destroy();
}

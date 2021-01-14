window.lottieAnimation = bodymovin.loadAnimation({
    container: animation, // ID del div
    path: '/EcoProgress/Project/Web/public/media/animation.json', // Ruta fichero .json de la animación
    renderer: 'svg', // Requerido
    loop: true, // Opcional
    autoplay: false, // Opcional
    rendererSettings: {
        filterSize: {
            width: '50%',
            height: '50%',
            x: '-50%',
            y: '-50%',
        }
    }
}, )
function playAnimation() {
    window.lottieAnimation.play();
}

function stopAnimation() {
    window.lottieAnimation.stop();
    window.lottieAnimation.destroy();
}
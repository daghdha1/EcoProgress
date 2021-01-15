let isAnimating = false;

function playAnimation() {
    if (!isAnimating)
        loadAnimation();
    window.lottieAnimation.play();
    window.lottieAnimationText.play();
}

function loadAnimation() {
    isAnimating = true;

    window.lottieAnimation = bodymovin.loadAnimation({
        container: animation, // ID del div
        path: '/EcoProgress/Project/Web/public/media/animation.json', // Ruta fichero .json de la animación
        renderer: 'svg', // Requerido
        loop: true, // Opcional
        autoplay: false
    });
    window.lottieAnimationText = bodymovin.loadAnimation({
        container: animationText, // ID del div
        path: '/EcoProgress/Project/Web/public/media/animationText.json', // Ruta fichero .json de la animación
        renderer: 'svg', // Requerido
        loop: true, // Opcional
        autoplay: false // Opcional

    });

}

function stopAnimation() {

    //window.lottieAnimation.stop();
    window.lottieAnimation.destroy();
    //window.lottieAnimation.stop();
    window.lottieAnimationText.destroy();

    isAnimating = false;
}
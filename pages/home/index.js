import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { SplitText } from 'gsap/all'

document.addEventListener('DOMContentLoaded', (event) => {
	// gsap code here!
	gsap.registerPlugin(MotionPathPlugin)
      const textElement = document.querySelector('.text');
      const splitTextInstance = new SplitText(textElement, { type: 'chars' });
      
      const chars = splitTextInstance.chars;
      
      // Устанавливаем начальные позиции символов и переворачиваем по осям X и Y
      chars.forEach((char, index) => {
        const rect = char.getBoundingClientRect();
        char.style.position = 'absolute';
        char.style.left = `${rect.left - textElement.getBoundingClientRect().left}px`;
        char.style.top = `${rect.top - textElement.getBoundingClientRect().top}px`;
        char.style.width = `${rect.width}px`;
        char.style.height = `${rect.height}px`;
      });
      
      // Анимация каждого символа по кривой с бесконечным повторением и autoRotate
      gsap.set(chars, {xPercent: -50, yPercent: -50});
      gsap.timeline({repeat: -1})
        .to(chars, {
          duration: 15,
          motionPath: {
            path: ".mypath",
            align: ".mypath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
          ease: 'linear',
          stagger: {
            each: 0.1,
            repeat: -1,
            yoyo: false, // Движение в одну сторону
            from: "start" // Начало с первой буквы
          },
          immediateRender: true
        });
})

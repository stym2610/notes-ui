import { trigger, transition, style, animate, state, keyframes, animation, useAnimation } from '@angular/animations';


export let fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
});

export let fadeOutAnimation = animation(
    animate(500, style({ opacity: 0}))
);

export let fade = trigger('fade', [
    transition(':enter', 
        useAnimation(fadeInAnimation)
    ),
    transition(':leave', 
        useAnimation(fadeOutAnimation)
    )
]);

export let bounceOutLeftAnimation = animation(
    animate('500ms ease-in', keyframes([
        style({ 
            offset: .2,
            transform: 'translateX(20px)'}),
        style({ 
            offset: 1,
            transform: 'translateX(-100%)'})  
    ]))
);

export let slide = trigger('slide', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
        style({ transform: 'translateX(-10px)' }),
        animate('500ms ease-out')
    ]),
    transition(':leave', 
        useAnimation(bounceOutLeftAnimation)
    )
]);
 
            
export let bounce = trigger('bounce', [
    transition(':enter', [
        animate('1500ms ease-out', keyframes([
            style({ 
                offset: .1,
                transform: 'translateY(-70px)'}),
            style({ 
                offset: .2,
                transform: 'translateY(0)'}),
            style({ 
                offset: .4,
                transform: 'translateY(-50px)'}),
            style({ 
                offset: .6,
                transform: 'translateY(0)'}), 
            style({ 
                offset: .8,
                transform: 'translateY(-30px)'}),  
            style({ 
                offset: 1,
                transform: 'translateY(0)'})            
        ]))
    ])
]);
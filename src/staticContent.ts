import { ISourceOptions } from 'tsparticles-engine'

export const particlesOption: ISourceOptions = {
  fpsLimit: 90,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      resize: false,
    },
    modes: {
      push: {
        quantity: 1,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#BCE5F5',
    },
    links: {
      color: '#BEBEBE',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 0.7,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 600,
      },
      value: 25,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const basic = {
  version: 'v1.0.0a',
  codename: 'Minimalistic',
  author: 'Emil Shergali',

  basicOpenGraph: {
    type: 'website',
    images: [
      {
        url: 'https://crd-project.github.io/static/og-image-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'crd-project.github.io 1200x630',
      },
      {
        url: 'https://crd-project.github.io/static/og-image-800x600.png',
        width: 800,
        height: 600,
        alt: 'crd-project.github.io 800x600',
      },
      {
        url: 'https://crd-project.github.io/static/og-image-600x600.png',
        width: 600,
        height: 600,
        alt: 'crd-project.github.io 600x600',
      },
      {
        url: 'https://crd-project.github.io/static/og-image-200x200.png',
        width: 200,
        height: 200,
        alt: 'crd-project.github.io 200x200',
      },
    ],
  },
}

export default basic

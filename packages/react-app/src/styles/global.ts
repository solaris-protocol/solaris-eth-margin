import { css } from '@linaria/core';

export const globalCss = css`
  :global() {
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      background: #0E090F;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: url('./../assets/images/bg-lines.svg') no-repeat 50% 60%;
        background-size: 200% 200%;

        content: '';
      }
    }

    a {
      text-decoration: none;

      transition: color 0.3s;
    }

    button {
      white-space: nowrap;

      background-color: transparent;
      border: none;
      cursor: pointer;

      transition: color 0.3s;

      appearance: none;

      &:hover {
        color: #fff;
      }
    }

    &::-webkit-scrollbar {
      width: 8px !important;
      height: 8px !important;
    }

    &::-webkit-scrollbar-track {
      background: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
    }
  }
`;

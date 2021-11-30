export const Link = ({ to, content, className, state }) => {
  //   history.pushState(state ? state : null, "title", path);
  // link에서 해야될 것은 e.preventDefault, history변경
  window.onClickAtag = (e) => {
    e.preventDefault();
    history.pushState(state ? state : null, "", e.target.href);
  };
  return `<a onclick="onClickAtag(event)"href="${to}" ${
    className ? `class="${className}"` : className
  }>${content}</a>`;
};

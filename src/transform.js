export function transform_(bg, element, viewport, options) {
  coverElement_(bg, element, viewport, options);
  alignX_(bg, element, viewport, options);
  if (options.use3d) {
    parallax3d_(bg, element, viewport, options);
  } else {
    parallax2d_(bg, element, viewport, options);
  }
}

function scale_(bg, s) {
  bg.x *= s;
  bg.y *= s;
  bg.z *= s;
  bg.w *= s;
  bg.h *= s;
}

function coverElement_(bg, element, viewport, options) {
  const minWidth = element.w;
  const minHeight = viewport.h + options.velocity * (viewport.h - element.h);
  const widthScale = minWidth / bg.w;
  const heightScale = minHeight / bg.h;
  scale_(bg, Math.max(widthScale, heightScale));
}

function alignX_(bg, element, viewport, options) {
  bg.x = (0.5 - options.alignX) * (bg.w - element.w);
}

function parallax3d_(bg, element, viewport, options) {
  const velocity = options.velocity;
  scale_(bg, 1 / velocity);
  bg.z += 1 - 1 / velocity;
  bg.x -= element.x * (1 - 1 / velocity);
}

function parallax2d_(bg, element, viewport, options) {
  bg.y += element.y * (options.velocity - 1);
}

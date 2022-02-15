## standard level
kind of version

## docs
- <https://www.w3.org/Style/CSS/current-work>
- <https://drafts.csswg.org/>

## specificity:
inline	->	id	->	attr & class	-> element & pseudo element

## precedence
inline > external

## sass

- semicolon is mandatory;
- import from alias defined in webpack (no extension):
  @import '~Styles/main';


### optimization
- shorthand
- composite selectors to composite name
- trigger GPU (transition, 3d transform, canvas, WebGL)
  - new stacking context
  - new layers (<video>, <canvas> and <iframe>)
- absolute/fixed position animationed target
- too slight animation steps to achieve better smoothness may cause cpu jagging, then instead diminish smoothness.
- avoid table layout (element after affect those before, them multiple passes are needed), or set `table-layout: fixed`
- limit the class scope (as nearer as possible to the target) 
- `font-display: fallback;` to prevent blocking
- `contain` <https://developer.mozilla.org/en-US/docs/Web/CSS/contain>


## BEM naming:
- Block: .block
- Element: .block__elm
- Modifier: .block__elm--color-red

## hsl(0-360, %, %, .1)

## region chain:
- flow-into: named_flow
- flow-from: named_flow
- region-break: auto/break(break to non-exist region when overflow);
 ## @region selector{}

## break(page/column/region): break-inside/before/after

## css module no syntax for multi-rules in curly braces (:global{}); ':global' has to be prepended to each rule;
- mix scopes in the same rule:
  `.select:global(.Select--single > .Select-control .Select-value) {}`

## shorthand properties set all sub-properties, missing values are set to 'initial';
- some sub-property can only be set to initial(no way to set it);
- 'all:initial | inherit | unset' is a special shorthand, which reset all properties(except 'direction' / 'unicode-bidi');
- !important applies to all;

## namespace:
	@namespace ns 'http://faf'
	ns|div{}

## conditional:
- @media:
 @media screen and (min-width: 35em),
        print and (min-width: 40em) {
			  #section_navigation { float: left; width: 10em; }
			  @media (max-width: 12cm) { // rule (2)
				  .note { float: none }
			 }
		}
-	@support:
```css
@supports ( box-shadow: 2px 2px 2px black ) or
          ( -moz-box-shadow: 2px 2px 2px black ) or
          ( -webkit-box-shadow: 2px 2px 2px black ) and 
          not ( -o-box-shadow: 2px 2px 2px black ) {
  .outline {
    color: white;
    -moz-box-shadow: 2px 2px 2px black;
    -webkit-box-shadow: 2px 2px 2px black;
    -o-box-shadow: 2px 2px 2px black;
    box-shadow: 2px 2px 2px black; /* unprefixed last */
  }
}
```

## :target denotes this element is referred by some link anchor;

## :indeterminate denotes a checkbox/radio is in indeterminated state; 

## :root	->html

## :only-child	->:first-child:last-child

## :empty	-> <p></p>

## :not(div)

## sibling(only predecesor constraint): 
- div+p	-> p which follows div;
- div~p	-> p which succeeds div(may not immediately);

## attribute selector accept 'starts'/'end'/'includes':

## attribute selector accept 'starts'/'end'/'includes':
`[attr^='val']	/	[attr$='val']	/	[attr*='val']	`

## multi-column extends 'block', for texts;
- flex-wrap: multiple rows/columns;
- column-count: total columns;
- column-width: minimum width;
- column-fill:auto/balance;
- column-span:all; --applied on element;
  + minimum-width takes precedence than count; usually only one is set, and both takes the property name 'columns';
- breaks on inline element(occupies a single column), block elements are not broken(stacked in a single column);
- each column has the same width(column-fill:balance controlls content to spread equally);


## visibility:collapse works only in row/column/flex-item (not `display:table-*`), or equal to hidden;
 set main-size to zero and keeps the cross-size untouched.

## 7 layouts: block, inline, table, positioned, column, flex, grid;

## flex(disply:flex/inline-flex): to make content always fill container by growing/shrinking; items with the same dimension in cross-axis;
- by default, grow is turned off, shrink is on
- if wrap is enabled, the sizes on cross axis is divided according to their actual size.
- no effect: column, float/clear, vertical-align, ::first*;
- direct text is wrapped in anonymous item;
- absolutely positioned child doesn't participate in the flex layout;
- percentage in padding/margin on item is not consistent across browsers;
- flex-basis: initial width/height before fill is applied, take precedence over 'width/height';
  + auto: calc the original size on the fly
  + 0: won't shrink other siblings 
- flex-grow/shrink: set on items of flex-box, a factor relative to the rest items among items for proporation of leftover space or shrinked space;
- flex-wrap:wrap; grow/shrink no need to exist;
- if no flex-grow/shrink is specified, fill based on the propotion of their basis;
- flex-direction: row/collumn
  children runs in a row/collumn

- align: 

  + main-axis: justify-content

    flex-start | flex-end | center | space-between | space-around 

  + cross-axis

    `[auto |] flex-start | flex-end | center | baseline | stretch`

    - align-items: on container, default for all items
    - align-self: on item itself

    flex-start | flex-end | center | space-between | space-around | stretch 

    - align-content: for multi-line/wrap only

  + stretch: expand to the same size

- flex: num num unit;	grow/shrink/basis;
  + when less than three, grow take precedence than shrink;
  + basis is set to 0 when absent
- flex-flow: direction + wrap.
- by default grow/shrink respect their ratio of flex-basis.



## grid
- margins of container/content and item/item don't collapse;
- 'auto' is 'max-content' or minimum size(towarding to content size);
- name in '[]' denotes line;
- 1fr takes 1/* of all fractions;



## 3d:
- space, e.g. distance from user/camera/container to the z=0 plane (where the scene is exactly contained in camera)
  .) if not set, always 2 dimensions;
  .) determines the distance (positive) translateZ can apply, when bigger than space/perspective, it disappears;
 	.) set in container: perspective:100px;
	.) set in itself(placed before 3d transformation or no effect): transform: perspective(100px) rotateY(45deg)

                         _
      _        +z       | |     -z
     |_|      <----     |_|    ---->

     camera           z=0 plane 

- viewer stand point(vanishing point):
 	perspective-origin: 0 0;
- don't show from back:
 	backface-visibility:hidden;
 	transform: rotateY(91deg);
- when element is moved off from z=0 plane, rotating is around its original location/'z=0 plane', the distance is rotating radius;
- when parent has translate(even 0deg), immediate children will have no effect for its translate, unless set this on the parent:
 	transform-style:preserve-3d;
	+ this will not be inheritted;


## width: browser window; device-width: screen
- equal in mobile, since usually browser window is not resizable;

## aspect-ratio: width/height

## resolution: density of pixels to physical dimension;

## device-pixel-ratio: physical pixels/logical(reported/density-independent) pixels; 
    `devicePixel/cssPixel`
- when high resolution device reports device width as predecessor(pixel turns to logical), but pixel contains more than one physical pixels;
- apple specific for retina; 
- physical pixels=reported pixels*ratio:	real divice-width is divice-width*device-pixel-ratio;
- dpr:window.devicePixelRatio (get physical pixel from this);
- size user can manipulate (js/css) are all logical DIP

## when orientation changes, apple devices don't swap 'device-width'/'device-height' as other venders;

## only when image is broken, it's ':before'/':after' takes effect;

## styleint: turn off a rule, set value to null;

## custom properties is used for configing of component which defines properties.

## precss focuses on syntax; cssnext focuses on new styles.

## viewport(applied only in mobile browser)
  cssPixel: logical pixel, DIP (device-independent-pixel).

- layout viewport: content width
  * document.documentElement.clientWidth;
    `rem` base
  * html{}
- visual viewport (varies by distance between window and content): content width in window
  * window.innerWidth (supported badly)
  * window.visualViewport.width (chrome)
- `meta[viewport]`
  * width: layout viewport (device-width: screen.width)
  * scale (device-width/visual-width): control visual viewport, e.g. content pixels displayed in window via changing distance.
    `cssPixel/devicePixel`

## requestAnimationFrame may not trigger 'trainsition';

## number input spinner:

## less

- group tokens together in mixin params: ~''

  `.abc(~'div .cls')`

- param in selector should interpolate

```
@{param}: {}
```
## `<link href='blob:...'` is not blocking.

## block formatting context (BFC)
+ styles
  - overflow: !visible
  - float: !none
  - position: absolute/fixed
  - display: table-cell, table-caption, inline-block, flex/inline-flex

+ margin collapse won't happen between BFC
+ could contain floats (height exists)
+ left edges of children (if not BFC) are aligned to the BFC

## set `min-width` when text blows flex box.

## multiline text ellipsis
```
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
```

## vertical center
- inline
  + padding
  + line-height
  + table-cell
  + flex (height fixed)
    - `flex-direction: row; align-items: center`
    - `flex-direction: column; justify-content: center`
    - `margin: auto` in children
- block
  + absolute + top + margin-top (height known)
  + absolute + top + translateY (height unknown)
  + table + table-cell (may stretch the height of container)
  + left/top/right/bottom: 0; margin: auto; position: absolute; (child)

- grid + margin-auto

## blend
- background (backround urls and color)
> the first url at top
> `normal` by default, no blending
```
background-image: url(first-image.png), url(second-image.png);
background-color: orange;
background-blend-mode: screen, multiply;
```
- element (with other elements behind in the same stacking context)
`mix-blend-mode`
  

- new stacking context
  + `isolation: isolate;`
  + `opacity` other than 1
  + `position: fixed`
  + will-change
  + filter
  + transform
  + animation


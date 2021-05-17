
# Installing a dependency containing swift code

In order for XCode to successfully build when one of your dependency contains swift code, you can create an empty swift file in your project. Name it however you want, and when XCode offers to create a bridging header, click yes.

## Illustrated Instructions

1) Select `New file...` from the menu

![New file](https://user-images.githubusercontent.com/6181446/118495815-db8b2600-b723-11eb-8fef-bb69e2cdf676.png)

2) Select `Swift File`

![Swift file](https://user-images.githubusercontent.com/6181446/118495821-dc23bc80-b723-11eb-8dc2-1d44827a33a4.png)

3) Name you file however you want this doesn't matter (here I named it "fix")

![File Name](https://user-images.githubusercontent.com/6181446/118496044-0f664b80-b724-11eb-9bad-23761dc8bea6.png)

4) You can but don't have to create a bridging header (if you don't know what this is, just press no)

![Bridging header](https://user-images.githubusercontent.com/6181446/118495825-dcbc5300-b723-11eb-9140-4bd5c1392c87.png)

## Example of errors that will be fixed

`Undefined symbol: __swift_FORCE_LOAD_$`

![XCode erros](https://user-images.githubusercontent.com/6181446/118483850-d1aef600-b716-11eb-9d2d-d91b05ee4d65.png)






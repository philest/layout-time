
INPUTFOLDER1="original"
OUTPUT1="output_svg"
OUTPUT2="output_img"


rm -r $OUTPUT1 $OUTPUT2;
mkdir $OUTPUT1 $OUTPUT2;

for file in ./$INPUTFOLDER1/*
do
    FN=$(basename $file );
    BASE="${FN%.*}";
	echo $FN;
    OUT="${OUTPUT1}/${BASE}_spine.svg";
    PNG="${OUTPUT2}/${BASE}_spine.png";
    PNGBIG="${OUTPUT2}/${BASE}_spine_big.png";

    # we have to sed the html for unknown reasons :(
    (node makesvg.js --svg $file | sed -e 's/href/xlink:href/g' ) > $OUT;

    # resize the image (respects aspect ratio, only shrinks)
    svg2png $OUT -o $PNGBIG
    convert $PNGBIG -resize 200x200\> $PNG
done

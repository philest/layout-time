INPUTF="en"
OUTPUTF="es"

for file in ./$INPUTF/*
do
    FN=$(basename $file );
    BASE="${FN%.*}";

	cp "${file}" "${INPUTF}/${OUTPUTF}/${BASE}_es.jpg"  
done

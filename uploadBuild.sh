# build script via butler
# to install butler please visit: https://itch.io/docs/butler/installing.html

zip -vr public.zip public/
butler push public rithmgaming/bubble-burst:HTML5

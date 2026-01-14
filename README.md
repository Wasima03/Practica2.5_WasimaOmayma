# Practica2.5_WasimaOmayma
Nuestro proyecto se trata de una aplicación web que permite al usuario rellenar un formulario con sus datos personales y preferencias profesionales para descubrir un “rol profesional” basado en sus respuestas. Al enviar el formulario, aparece un modal con el resultado resumido.

Nuestra aplicación tiene un formulario con diferentes campos: texto, número, email, select, checkboxes y un textarea, todos con su id y name. Cada campo se valida para asegurar que los datos sean correctos: se comprueba la longitud del texto, el rango del número, el email válido, la selección obligatoria del select y al menos un checkbox marcado. 

Cuando algún campo no es correcto, se muestra un mensaje de error y el borde del campo cambia para mejorar la experiencia del usuario. Al enviar el formulario correctamente, se crea dinámicamente un modal que muestra un resumen con el resultado del test. 

Además, se incluyen botones que permiten guardar los datos en localStorage, restaurarlos y recargar la página usando funcionalidades del navegador. El código utiliza funciones propias para validar campos y mostrar mensajes, y se emplean métodos como classList y localStorage. 

Hemos intentado usar un diseño profesional, con colores claros y suaves, sombras y difuminados que hacen que el formulario y el modal se vean modernos y fáciles de usar. 

En resumen, la aplicación combina interactividad, validaciones, elementos dinámicos y almacenamiento local dentro de un diseño atractivo.
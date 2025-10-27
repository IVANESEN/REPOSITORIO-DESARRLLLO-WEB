let table="<table>";
table +="<thead>";
table +="<tr>";
table +="<th scope='col'>#</th>";
table +="<th scope='col'>Nombre</th>";
table +="<th scope='col'>Apellido</th>";
table +="<th scope='col'>Correo electrónico</th>";
table +="</tr>";
table +="</thead>";
table +="<tbody>";

const alumnnos =[
    {id: 1, nombre:"Marcos Antonio", apellido:"Alas", correo:"marco.alas@estudiante.esen.edu.sv" },
    {id: 2, nombre:"Ana Paola", apellido:"Rivas Polanco", correo:"paola.rivas@estudiante.esen.edu.sv" },
    {id: 3, nombre:"Alexis Armando", apellido:"Quintanilla Peña", correo:"alexis.quintanilla@estudiante.esen.edu.sv" },
    {id: 3, nombre:"Vanesa Alejandra", apellido:"Bermudez Urquia", correo:"vanesa.bermudez@estudiante.esen.edu.sv" },
    {id: 3, nombre:"Oscar Armando", apellido:"López Rodríguez", correo:"oscar.lopez@estudiante.esen.edu.sv" },
];

alumnnos.forEach(alumno=> {
    table +="<tr>";
    table +=`<td scope='row'>${alumno.id}</td>`;
    table +=`<td>${alumno.nombre}</td>`;
    table +=`<td>${alumno.apellido}</td>`;
    table +=`<td>${alumno.correo}</td>`;
    table += "</tr>";

});

table +="</tbody>";
table +="</table>";

const contenedor =document.querySelector("#idContenedor");
contenedor.innerHTML=table;


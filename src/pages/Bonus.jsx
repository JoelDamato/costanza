import React from "react";
import Navbar from "../components/Navbar";

const bonuses = [
	{
		title: "Pack de imágenes listas para tu consultorio",
		img: "https://i.ibb.co/qLj791Q0/1.png",
		btn: "Acceder al pack",
		link: "https://drive.google.com/drive/folders/1w9ni5L-y66o4-wUSx49uEOkxnP5U9yd0?usp=drive_link",
	},
	{
		title: "Comunidad privada de odontólogos",
		img: "https://i.ibb.co/0Rwd0zwQ/2.png",
		btn: "Acceder al grupo",
	},
	{
		title: "Mensajes que hacen volver a tus pacientes",
		img: "https://i.ibb.co/mFGS5Czg/3.png",
		btn: "Acceder al recurso",
		link:"https://drive.google.com/drive/folders/1NcGhcVVRdRlPl02180cq7pm-4S_8GiVe?usp=drive_link",
	},
	{
		title: "Herramientas digitales que te ahorran tiempo",
		img: "https://i.ibb.co/tTWw3gXw/4.png",
		btn: "Acceder al recurso"
	},
	{
		title: "Recursos descargables de gestión",
		img: "https://i.ibb.co/gMNCNxky/5.png",
		btn: "Acceder al recurso",
		link: "https://drive.google.com/drive/folders/16pEvp6wJggcoTGrOrC0seZE2LQ6yjbwn?usp=drive_link",
	},
	{
		title: "Descuentos exclusivos en insumos y equipamiento",
		img: "https://i.ibb.co/8LV1ZYKD/6.png",
		btn: "Acceder a los descuentos",
	},
];

export default function BonusPage() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-black text-white py-10 px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-yellow-400 mb-4">
						BONUS EXCLUSIVOS!
					</h1>
					<p className="max-w-2xl mx-auto text-lg">
						Accedé a todos los recursos, herramientas y materiales que
						potenciarán tu consultorio. Descargá, aplicá y crecé junto a la
						comunidad.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
					{bonuses.map((bonus, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center gap-4 text-center h-full bg-transparent"
							style={{ minHeight: "370px" }} // Ajusta el alto mínimo según tu diseño
						>
							<img
								src={bonus.img}
								alt={bonus.title}
								className="w-full max-w-xs rounded-xl shadow-lg"
							/>
							<h2 className="text-lg font-semibold px-4">{bonus.title}</h2>
							<div className="flex-grow" />
							{bonus.link ? (
								<a
									href={bonus.link}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition mt-auto"
								>
									{bonus.btn}
								</a>
							) : (
								<button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition mt-auto">
									{bonus.btn}
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
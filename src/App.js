import logo from './logo.svg';
import './App.css';

import React, { useCallback, useRef, useState, useMemo, useEffect  } from 'react';
import { toPng, toJpeg } from 'html-to-image';

import ImageUploader from './components/ImageUploader';
import JoditEditor from 'jodit-react';


import titleCazador from "./img/Cards/titleCriaturaNormal.png"
import titleCriaturaNormal from "./img/Cards/titleLegendaria.png"
import titleCriaturaEfecto from "./img/Cards/titleCriaturaEfecto.png"
import titleLegendaria from "./img/Cards/titleCazador.png"
import titleObjeto from "./img/Cards/titleObjeto.png"
import titleObjetoCorrupto from "./img/Cards/titleObjetoCorrupto.png"

import Cazador from "./img/Cards/cazador.png"
import CriaturaNormal from "./img/Cards/criaturaNormal.png"
import CriaturaEfecto from "./img/Cards/criaturaEfecto.png"
import Legendaria from "./img/Cards/legendaria.png"
import Objeto from "./img/Cards/objeto.png"
import ObjetoCorrupto from "./img/Cards/corrupto.png"

import heartBlue from "./img/corazonblue.png";
import heartRed from "./img/corazonred.png";
import heartGray from "./img/corazongray.png";

import luz from "./img/luz.png";
import oscuridad from "./img/oscuridad.png";
import divino from "./img/divino.png";
import natural from "./img/natural.png";
import toxico from "./img/toxico.png";
import elemental from "./img/elemental.png";
import guerrero from "./img/guerrero.png";
import nomuerto from "./img/nomuerto.png";
import caotico from "./img/caotico.png";

import iconAccionRapida from "./img/iconAccionRapida.png"
import iconAccionNormal from "./img/iconAccionnormal.png"
import iconCampo from "./img/iconCampo.png"
import iconDesplazar from "./img/iconDesplazar.png"
import iconRonda from "./img/iconRonda.png"
import iconTiempo from "./img/iconTiempo.png"
import iconTurno from "./img/iconTurno.png"

import infinite from "./img/Cards-28.png"


function App(placeholder) {

	// ===============================================
	// Lista objetos icon

	// name: "Accion Rapida",
	// img: iconAccionRapida

	let typeIcon = [
		{
			name: "Accion Rapida",
			img: iconAccionRapida
		},
		{
			name: "Accion Normal",
			img: iconAccionNormal
		},
		{
			name: "Campo",
			img: iconCampo
		},
		{
			name: "Desplazar",
			img: iconDesplazar
		},
		{
			name: "Ronda",
			img: iconRonda
		},
		{
			name: "Tiempo",
			img: iconTiempo
		},
		{
			name: "Turno",
			img: iconTurno
		},
	]

	// ===============================================
	// Lista de tipos de cartas

	// name: "Cazador",
	// title: titleCazador,
	// card: Cazador,
	// object: false

	let typeCard = [
		{
			name: "Cazador",
			title: titleCazador,
			card: Cazador,
			object: false
		},
		{
			name: "Legendaria",
			title: titleLegendaria,
			card: Legendaria,
			object: false
		},
		{
			name: "Criatura Normal",
			title: titleCriaturaNormal,
			card: CriaturaNormal,
			object: false
		},
		{
			name: "Criatura Efecto",
			title: titleCriaturaEfecto,
			card: CriaturaEfecto,
			object: false
		},
		{
			name: "Objeto",
			title: titleObjeto,
			card: Objeto,
			object: true
		},
		{
			name: "Corrupto",
			title: titleObjetoCorrupto,
			card: ObjetoCorrupto,
			object: true
		},
	]

	// ===============================================
	// Type List

	// name: "luz",
	// img: luz

	let type = [
		{
			name: "luz",
			img: luz
		},
		{
			name: "oscuridad",
			img: oscuridad
		},
		{
			name: "divino",
			img: divino
		},
		{
			name: "natural",
			img: natural
		},
		{
			name: "toxico",
			img: toxico
		},
		{
			name: "elemental",
			img: elemental
		},
		{
			name: "guerrero",
			img: guerrero
		},
		{
			name: "nomuerto",
			img: nomuerto
		},
		{
			name: "caotico",
			img: caotico
		},
	]

	// ===============================================
	// TextArea
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useCallback(
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		},
		[placeholder]
	);

	// ===============================================
	// Nombre

	const [nameDoc, setNameDoc] = useState("basic")

	const changeName = (e) => {
		let tempName = ""+e.target.value
		setNameDoc(tempName)
	}

	// ===============================================
	// EXPORTAR CARTA
	const ref = useRef(null)

	let x = nameDoc

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, {cacheBust: true, skipAutoScale: true, width: "905", height: "1280" })
		.then((dataUrl) => {
			const link = document.createElement('a')
			link.download = nameDoc+'.jpg'
			link.href = dataUrl
			link.click()
		})
		.catch((err) => {
			console.log(err)
		})
	}, [ref, nameDoc])


	// ===============================================
	// CARGAR IMAGEN

	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setImage(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	// ===============================================
	// EDITAR IMAGEN DE CARTA

	const [imgHeight, setImgHeight] = useState(100);

	const changeHeight = (e) => {
		setImgHeight(e.target.value)
	}

	const [imgMoveY, setImgMoveY] = useState(0)

	const changeMoveY = (e) => {
		setImgMoveY(e.target.value)
	}

	const [imgMoveX, setImgMoveX] = useState(0)

	const changeMoveX = (e) => {
		setImgMoveX(e.target.value)
	}

	// ===============================================
	// Cambiar Texto 

	const [fontSize, setFontSize] = useState(50)

	const changeFontSize = (e) => {
		setFontSize(e.target.value)
	}

	// Cambiar Ataques

	const [atkF, setAtkF] = useState(0);
	const [atkP, setAtkP] = useState(0);

	const changeAtkF = (e) => {
		let num = e.target.value
		if(num > 9){
			num = 9
		}

		if (num < 0) {
			num = 0
		}

		setAtkF(num)
	}
	const changeAtkP = (e) => {
		let num = e.target.value
		if(num > 9){
			num = 9
		}

		if (num < 0) {
			num = 0
		}

		setAtkP(num)
	}

	// ===============================================
	// Corazones

	const [hblue, setHBlue] = useState(3)
	const [hred, setHRed] = useState(3)
	const [hGray, setHGray] = useState(3)

	const changehGray = (e) => {
		let diff = (parseInt(hblue) + parseInt(hred) + parseInt(e.target.value))
		if (diff > 10) {

		} else {
			setHGray(e.target.value)
		}
	}

	const changehBlue = (e) => {
		let diff = (parseInt(e.target.value) + parseInt(hred) + parseInt(hGray))
		if (diff > 10) {

		} else {
			setHBlue(e.target.value)
		}
	}

	const changehRed = (e) => {
		let diff = (parseInt(hblue) + parseInt(e.target.value) + parseInt(hGray))
		if (diff > 10) {

		} else {
			setHRed(e.target.value)
		}
	}

	const renderHeartBlue = () => {
		const images = [];
		for (let i = 0; i < hblue; i++) {
		  images.push(<img key={i} className='blue' src={heartBlue} alt={`Imagen ${i}`} />);
		}
		return images;
	};
	const renderHeartRed = () => {
		const images = [];
		for (let i = 0; i < hred; i++) {
		  images.push(<img key={i} className='red' src={heartRed} alt={`Imagen ${i}`} />);
		}
		return images;
	};
	const renderHeartTotal = () => {
		const images = [];
		for (let i = 0; i < hGray; i++) {
		  images.push(<img key={i} className='gray' src={heartGray} alt={`Imagen ${i}`} />);
		}
		return images;
	};

	// ===============================================
	// Seleccionar Corazones

	const [typeSelect, setTypeSelect] = useState("none")

	const changeTypeCharacter = (e) => {
		setTypeSelect(e.target.value);
	}

	// ===============================================
	// ID SKU
	const [skuid, setSkuid] = useState("DDD-001")

	const changeSkuID = (e) => {
		setSkuid(e.target.value)
	}

	// ===============================================
	// Tipo de carta

	const [selectedTypeCard, setSelectedTypeCard] = useState({
		name: "Cazador",
		title: titleCazador,
		card: Cazador,
		object: false
	})

	const changeCardType = (e) => {
		let tempTypeCard = typeCard

		setSelectedTypeCard(tempTypeCard.filter(w => w.name === e.target.value)[0]);
	}

	// Tipo de Accion
	const [selectedTypeAction, setSelectedTypeAction] = useState({
		name: "Accion Rapida",
		img: iconAccionRapida
	})

	const changeActionType = (e) => {
		let temp = typeIcon.filter(w => w.name === e.target.value)
		setSelectedTypeAction(temp[0])
	}

	const [ilus, setIlus] = useState("nickname")

	const changeIlus = (e) => {
		setIlus(e.target.value)
	}

	// const demo = () => {
	// 	console.log(selectedTypeCard);
	// }

	return (
		<div className="App">
			<div style={{width: "99vw", height: "1px"}}></div>
			{/* Opciones */}
			<div className='options'>
				{/* <button onClick={demo}>Clickme</button> */}
				<div className='editbox2'>
					<label>
						<h3>Seleccionar Tipo de Carta</h3>
						<select onChange={changeCardType}>
							{typeCard.map((e, i)=>{
								return(
									<option value={e.name} key={i}>{e.name}</option>
								)
							})}
						</select>
					</label>
				</div>
				<div className='editbox1'>
					<label>
						<h3>Nombre del archivo</h3>
						<input type="text" value={nameDoc} onChange={changeName} />
					</label>
					<label>
						<h3>Tamaño del Texto = {fontSize}</h3>
						<input type="range" min={20} max={60} value={fontSize} onChange={changeFontSize} />
					</label>
				</div>

				<div className='editbox2'>
					<h3>Cargar Imagen</h3>
					<input type="file" accept="image/*" onChange={handleImageChange} />
					<label>
						<h3>Tamaño Imagen = {imgHeight}%</h3>
						<input type="range" min={20} max={400} value={imgHeight} onChange={changeHeight} />
					</label>
					<label>
						<h3>Mover Imagen Vertical = {imgMoveY}px</h3>
						<input type="range" min={-300} max={300} value={imgMoveY} onChange={changeMoveY} />
					</label>
					<label>
						<h3>Mover Imagen Horizontal = {imgMoveX}px</h3>
						<input type="range" min={-300} max={300} value={imgMoveX} onChange={changeMoveX} />
					</label>
				</div>

				<div className='editbox1'>
					<div>
						<label>
							{!selectedTypeCard.object &&
								<div>
									<h3>Ataque Fisico</h3>
									<input type="number" min={1} max={9} value={atkF} onChange={changeAtkF} />
									<h3>Ataque Psiqico</h3>
									<input type="number" min={1} max={9} value={atkP} onChange={changeAtkP} />
								</div>
							}
							{selectedTypeCard.object &&
								<div>
									<h3>Tipo de Objeto (Icono)</h3>
									<select onChange={changeActionType}>
										{typeIcon.map((w, i)=>{
											return(
												<option value={w.name} key={i}>{w.name}</option>
											)
										})}
									</select>
									<h3>Usos</h3>
									<input type="number" min={1} max={9} value={atkP} onChange={changeAtkP} />
								</div>
							}
						</label>
					</div>
					<label>
						<h3>Tipo/Elemento</h3>
						<select onChange={changeTypeCharacter}>
							<option value="none">None</option>
							{type.map((x, i)=>{
								return (
									<option key={i} value={x.name}>{x.name}</option>
								)
							})}
						</select>
					</label>
				</div>

				<div className='editbox2'>
					<div style={{width: "100%"}}>
						<h3>Descripcion de la Carta</h3>
						<JoditEditor
							ref={editor}
							value={content}
							// config={config}
							// tabIndex={1} // tabIndex of textarea
							onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
							onChange={newContent => setContent(newContent)}
						/>
					</div>
				</div>

				<div className='editbox1'>

					<label>
						<h3>Corazones Extras</h3>
						<input type="number" min={0} max={10} value={hGray} onChange={changehGray} />
					</label>
					<label>
						<h3>Corazones Azules</h3>
						<input type="number" min={0} max={10} value={hblue} onChange={changehBlue} />
					</label>
					<label>
						<h3>Corazones Rojos</h3>
						<input type="number" min={0} max={10} value={hred} onChange={changehRed} />
					</label>
				</div>

				<div className='editbox2'>
					<h3>ID - SKU</h3>
					<input type="text" onChange={changeSkuID} value={skuid} />
				</div>
				<div className='editbox1'>
					<h3>Ilustrador Creditos</h3>
					<input type="text" onChange={changeIlus} value={ilus} />
				</div>
				<div className='editbox2'>
					<h3>Exportar Carta</h3>
					<button className='descarga' onClick={onButtonClick}>Descargar</button>
				</div>
			</div>


			{/* CARTA */}
			<div ref={ref} className='cart'
				style={{backgroundImage: "url("+selectedTypeCard.card+")"}}
			>
				<div className='sku'>
					{skuid}
				</div>

				<div className='ilus'>
					{ilus !== "" &&
						<p>Ilus. {ilus}</p>
					}
				</div>


				{type.filter(e => e.name === typeSelect).map((e, i)=>{
					return(
						<img className='type' key={i} src={e.img} alt={e.name} />
					)
				})}

				<div className="descripcion">
					<div dangerouslySetInnerHTML={{ __html: content }} />
				</div>

				<div className='nameCard'>
					<div className='text'>
						<h2
							style={{
								fontSize: fontSize+"px",
								color: selectedTypeCard.name === "Criatura Efecto" ? "#cacaca" : ""
							}}
						>{nameDoc}</h2>
					</div>
					<img src={selectedTypeCard.title} alt="asd" />
				</div>

				<div className="attacks">
					<div className='one'>
						{!selectedTypeCard.object &&
							<h2>{atkF}</h2>
						}
						{selectedTypeCard.object &&
							<img src={selectedTypeAction.img} />
						}
					</div>
					<div className='two'>
						{!selectedTypeCard.object &&
							<h2>{atkP}</h2>
						}
						{selectedTypeCard.object &&
							<h2>
								{(parseInt(atkP) === 0 ) &&
									<img src={infinite} />
								}
								{(parseInt(atkP) !== 0) &&
									<span>{atkP}</span>
								}
							</h2>
						}
						{/* <h2>{atkP}</h2> */}
						{/* infinite */}
					</div>
				</div>
				{image &&
					<div className='imageCharacter'>
						<img className='character' src={image} alt="Uploaded"
							style={{
								height: imgHeight+"%",
								transform: "translateY("+imgMoveY+"px) translateX("+imgMoveX+"px)"
							}}
						/>
					</div>
				}
				<div className='cocoros'>
					{renderHeartTotal()}
					{renderHeartBlue()}
					{renderHeartRed()}
				</div>
			</div>

		</div>
	);
}

export default App;

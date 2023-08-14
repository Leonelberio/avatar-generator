"use client";

import React, { useState, ReactElement, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import Avatar from "avataaars";
import { Piece } from "avataaars";
import * as FileSaver from "file-saver";
import axios from "axios"
import styles from "./page.module.css";

export default function Page() {
	// let avatarRef: Avatar | null = null;
	let avatarRef: any = useRef(null);
	let canvasRef: HTMLCanvasElement | null = null;

	const [optionSelected, setOptionSelected] = useState("skin");
	const [skin, setSkin] = useState("Light");
	const [hair, setHair] = useState("LongHairMiaWallace");
	const [hairColor, setHairColor] = useState("Black");
	const [facialHair, setFacialHair] = useState("Blank");
	const [accessories, setAccessories] = useState("Prescription02");
	const [clothes, setClothes] = useState("BlazerShirt");
	const [clothesColor, setClothesColor] = useState("Black");
	const [eyes, setEyes] = useState("Happy");
	const [eyebrow, setEyebrow] = useState("Default");
	const [mouth, setMouth] = useState("Smile");

	const attributes = new Map([
		["skin", "Skin"],
		["hair", "Hair"],
		["facialHair", "Facial Hair"],
		["accessories", "Accessories"],
		["clothes", "Clothes"],
		["eyes", "Eyes"],
		["eyebrow", "Eyebrows"],
		["mouth", "Mouth"],
	]);
	const attributesNodes: ReactElement[] = [];
	attributes.forEach((value, key) => {
		attributesNodes.push(
			<div
				className={
					optionSelected == key
						? `${styles.customizeOption}`
						: `${styles.customizeOption2}`
				}
				onClick={() => setOptionSelected(key)}
				key={key}
			>
				{value}
			</div>
		);
	});

	const skinTypes = ["Light", "Brown", "Tanned", "Pale", "Yellow", "DarkBrown", "Black"];
	const topTypes = [
		"NoHair",
		"Eyepatch",
		"Hat",
		"Hijab",
		"Turban",
		"WinterHat1",
		"WinterHat2",
		"WinterHat3",
		"WinterHat4",
		"LongHairBigHair",
		"LongHairBob",
		"LongHairBun",
		"LongHairCurly",
		"LongHairDreads",
		"LongHairFrida",
		"LongHairFro",
		"LongHairFroBand",
		"LongHairNotTooLong",
		"LongHairShavedSides",
		"LongHairMiaWallace",
		"LongHairStraight",
		"LongHairStraight2",
		"LongHairStraightStrand",
		"ShortHairDreads01",
		"ShortHairDreads02",
		"ShortHairFrizzle",
		"ShortHairShaggyMullet",
		"ShortHairShortCurly",
		"ShortHairShortFlat",
		"ShortHairShortRound",
		"ShortHairShortWaved",
		"ShortHairSides",
		"ShortHairTheCaesar",
		"ShortHairTheCaesarSidePart",
	];
	const facialHairTypes = [
		"Blank",
		"BeardLight",
		"BeardMedium",
		"BeardMajestic",
		"MoustacheFancy",
		"MoustacheMagnum",
	];
	const accessoriesTypes = [
		"Blank",
		"Kurt",
		"Prescription01",
		"Prescription02",
		"Round",
		"Sunglasses",
		"Wayfarers",
	];
	const clothesTypes = [
		"BlazerShirt",
		"BlazerSweater",
		"CollarSweater",
		"Hoodie",
		"Overall",
		"ShirtCrewNeck",
		"ShirtScoopNeck",
		"ShirtVNeck",
	];
	const eyesTypes = [
		"Close",
		"Cry",
		"Default",
		"Dizzy",
		"EyeRoll",
		"Happy",
		"Hearts",
		"Side",
		"Squint",
		"Surprised",
		"Wink",
		"WinkWacky",
	];
	const eyebrowTypes = [
		"Default",
		"Angry",
		"AngryNatural",
		"DefaultNatural",
		"FlatNatural",
		"RaisedExcited",
		"RaisedExcitedNatural",
		"SadConcerned",
		"SadConcernedNatural",
		"UnibrowNatural",
		"UpDown",
		"UpDownNatural",
	];
	const mouthTypes = [
		"Default",
		"Concerned",
		"Disbelief",
		"Eating",
		"Grimace",
		"Sad",
		"ScreamOpen",
		"Serious",
		"Smile",
		"Tongue",
		"Twinkle",
		"Vomit",
	];

	// Function to generate random number in given range
	function randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	const randomize = () => {
		setSkin(skinTypes[randomNumber(0, skinTypes.length - 1)]);
		setHair(topTypes[randomNumber(0, topTypes.length - 1)]);
		setFacialHair(facialHairTypes[randomNumber(0, facialHairTypes.length - 1)]);
		setAccessories(accessoriesTypes[randomNumber(0, accessoriesTypes.length - 1)]);
		setClothes(clothesTypes[randomNumber(0, clothesTypes.length - 1)]);
		setEyes(eyesTypes[randomNumber(0, eyesTypes.length - 1)]);
		setEyebrow(eyebrowTypes[randomNumber(0, eyebrowTypes.length - 1)]);
		setMouth(mouthTypes[randomNumber(0, mouthTypes.length - 1)]);
	};

	const triggerDownload = async(imageBlob: Blob, fileName: string) => {
		const bodyFormData = new FormData();
		bodyFormData.append('images', imageBlob);
		
		FileSaver.saveAs(imageBlob, fileName);
	};

	const download = () => {
		// const svgNode = ReactDOM.findDOMNode(avatarRef!)! as Element;
		let svgNode = document.getElementsByTagName("svg")[0] as Element
		const canvas = canvasRef!;
		const ctx = canvas.getContext("2d")!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const anyWindow = window as any;
		const DOMURL = anyWindow.URL || anyWindow.webkitURL || window;

		const data = svgNode.outerHTML;
		const img = new Image();
		const svg = new Blob([data], { type: "image/svg+xml" });
		const url = DOMURL.createObjectURL(svg);

		// console.log(svgNode);
		
		img.onload = () => {
			ctx.save();
			ctx.scale(2, 2);
			ctx.drawImage(img, 0, 0);
			ctx.restore();
			DOMURL.revokeObjectURL(url);
			canvasRef!.toBlob((imageBlob) => {
				triggerDownload(imageBlob!, "avataaars.png");
			});
		};
		img.src = url;
	};

	const createAvatarRef = (ref: Avatar) => {
		avatarRef = ref;
	};

	const createCanvasRef = (ref: HTMLCanvasElement) => {
		canvasRef = ref;
	};

	useEffect(() => {
		const test = avatarRef.current;
		console.log(test)
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.mainContainer}>
				<div className={styles.avatarContainer}>
					<Avatar
						style={{ width: '100%', maxHeight:'35vh' }}
						// ref={createAvatarRef}
						ref={avatarRef}
						avatarStyle="Circle"
						topType={hair}
						accessoriesType={accessories}
						hairColor={hairColor}
						facialHairType={facialHair}
						facialHairColor={hairColor}
						clotheType={clothes}
						clotheColor={clothesColor}
						eyeType={eyes}
						eyebrowType={eyebrow}
						mouthType={mouth}
						skinColor={skin}
					/>
				</div>
				<button className={styles.randomize} onClick={randomize}>
					Randomize
				</button>
			</div>
			<div className={styles.customizeContainer}>
				<div className={styles.customizeOptions}>{attributesNodes}</div>
				<div className={styles.customizePreviewContainer}>
					{optionSelected == "skin" && (
						<div className={styles.customizePreview}>
							{skinTypes.map((type, index) => {
								return (
									<div
										className={styles.pieceSkin}
										onClick={() => setSkin(type)}
										key={index}
									>
										<Piece
											avatarStyle="Circle"
											pieceType="skin"
											pieceSize="100"
											skinColor={type}
										/>
									</div>
								);
							})}
						</div>
					)}
					{optionSelected == "hair" && (
						<>
							<div className={styles.selectContainer}>
								<label style={{ padding: "0 10px", fontSize: "small" }}>
									Hair Color
								</label>
								<select
									style={{
										padding: "0 10px",
										fontSize: "small",
										background: "transparent",
										color: "#000",
									}}
									onChange={(e) => setHairColor(e.target.value)}
									value={hairColor}
								>
									<option value="Auburn">Auburn</option>
									<option value="Black">Black</option>
									<option value="Blonde">Blonde</option>
									<option value="BlondeGolden">BlondeGolden</option>
									<option value="Brown">Brown</option>
									<option value="BrownDark">BrownDark</option>
									<option value="PastelPink">PastelPink</option>
									<option value="Platnium">Platnium</option>
									<option value="Blue">Blue</option>
									<option value="SilverGray">SilverGray</option>
								</select>
							</div>
							<div className={styles.customizePreview}>
								{topTypes.map((type, index) => {
									return (
										<div
											className={styles.piece}
											onClick={() => setHair(type)}
											key={index}
										>
											<Piece
												avatarStyle="Circle"
												pieceType="top"
												pieceSize="100"
												topType={type}
												hairColor={hairColor}
											/>
										</div>
									);
								})}
							</div>
						</>
					)}
					{optionSelected == "facialHair" && (
						<div className={styles.customizePreview}>
							{facialHairTypes.map((type, index) => {
								return (
									<div
										className={styles.piece}
										onClick={() => setFacialHair(type)}
										key={index}
									>
										<Piece
											avatarStyle="Circle"
											pieceType="facialHair"
											pieceSize="100"
											facialHairType={type}
										/>
									</div>
								);
							})}
						</div>
					)}
					{optionSelected == "accessories" && (
						<div className={styles.customizePreview}>
							{accessoriesTypes.map((type, index) => {
								return (
									<div
										className={styles.piece}
										onClick={() => setAccessories(type)}
										key={index}
									>
										<Piece
											avatarStyle="Circle"
											pieceType="accessories"
											pieceSize="100"
											accessoriesType={type}
										/>
									</div>
								);
							})}
						</div>
					)}
					{optionSelected == "clothes" && (
						<>
							<div className={styles.selectContainer}>
								<label style={{ padding: "0 10px", fontSize: "small" }}>
									Clothes Color
								</label>
								<select
									style={{
										padding: "0 10px",
										fontSize: "small",
										background: "transparent",
										color: "#000",
									}}
									onChange={(e) => setClothesColor(e.target.value)}
									value={clothesColor}
								>
									<option value="Black">Black</option>
									<option value="Blue01">Blue01</option>
									<option value="Blue02">Blue02</option>
									<option value="Blue03">Blue03</option>
									<option value="Gray01">Gray01</option>
									<option value="Gray02">Gray02</option>
									<option value="Heather">Heather</option>
									<option value="PastelBlue">PastelBlue</option>
									<option value="PastelGreen">PastelGreen</option>
									<option value="PastelOrange">PastelOrange</option>
									<option value="PastelRed">PastelRed</option>
									<option value="PastelYellow">PastelYellow</option>
									<option value="Pink">Pink</option>
									<option value="Red">Red</option>
									<option value="White">White</option>
								</select>
							</div>
							<div className={styles.customizePreview}>
								{clothesTypes.map((type, index) => {
									return (
										<div
											className={styles.piece}
											onClick={() => setClothes(type)}
											key={index}
										>
											<Piece
												avatarStyle="Circle"
												pieceType="clothe"
												pieceSize="100"
												clotheType={type}
												clotheColor={clothesColor}
											/>
										</div>
									);
								})}
							</div>
						</>
					)}
					{optionSelected == "eyes" && (
						<div className={styles.customizePreview}>
							{eyesTypes.map((type, index) => {
								return (
									<div className={styles.pieceEyesBorder}>
										<div
											className={styles.pieceEyes}
											onClick={() => setEyes(type)}
											key={index}
										>
											<Piece
												avatarStyle="Circle"
												pieceType="eyes"
												pieceSize="125"
												eyeType={type}
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
					{optionSelected == "eyebrow" && (
						<div className={styles.customizePreview}>
							{eyebrowTypes.map((type, index) => {
								return (
									<div className={styles.pieceEyesBorder}>
										<div
											className={styles.pieceEyes}
											onClick={() => setEyebrow(type)}
											key={index}
										>
											<Piece
												avatarStyle="Circle"
												pieceType="eyebrows"
												pieceSize="125"
												eyebrowType={type}
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
					{optionSelected == "mouth" && (
						<div className={styles.customizePreview}>
							{mouthTypes.map((type, index) => {
								return (
									<div className={styles.pieceEyesBorder}>
										<div
											className={styles.pieceEyes}
											onClick={() => setMouth(type)}
											key={index}
										>
											<Piece
												avatarStyle="Circle"
												pieceType="mouth"
												pieceSize="125"
												mouthType={type}
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
			<div style={{ textAlign: "center", marginTop: "40px" }}>
				<button
					style={{
						padding: "10px 30px",
						border: "1px solid #47bc9d",
						background: "transparent",
						color: "#47bc9d",
						borderRadius: "5px",
					}}
					onClick={download}
				>
					Download
				</button>
			</div>
			<canvas style={{ display: "none" }} width="528" height="560" ref={createCanvasRef} />
		</div>
	);
}

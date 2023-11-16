import React from "react";
import ReactLoading from "react-loading";

import "./Load.css";

function Loading() {
return (
	<div className="load">
	<h2>Loading....</h2>
	<ReactLoading type="spinningBubbles" color="#0000FF"
		height={100} width={50} />
	
	</div>
);
}
export default Loading;
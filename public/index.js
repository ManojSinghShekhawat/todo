const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("listContainer");

listContainer.addEventListener("click", (e) => {
	if (e.target.tagName === "LI") {
		e.target.classList.toggle("checked");
	} else if (e.target.tagName === "SPAN") {
		e.target.parentElement.remove();
	}
});

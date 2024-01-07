export default function generateGrid() {
  const gridOutline = document.createElement("div");
  gridOutline.id = 'grid-outline';

  document.body.appendChild(gridOutline);

  for (let i = 0; i < 100; i++) {
    const box = document.createElement('div');
    box.className = 'grid-boxes';
    gridOutline.appendChild(box);
    box.id = i;
  }
}

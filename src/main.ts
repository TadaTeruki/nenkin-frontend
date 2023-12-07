import "./style.css";
import init, { NetworkBuilder } from "./pkg/nenkin";

window.onload = async () => {
  await init();

  const bound_x = 200.0;
  const bound_y = 100.0;

  const network = new NetworkBuilder(1000, bound_x, bound_y)
    .relaxate_sites(5)
    ?.build();
  if (network === undefined) {
    throw new Error("Failed to build network");
  }

  const canvas = document.getElementById("canvas_surface") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  const image_width = canvas.width;
  const image_height = canvas.height;

  const image_data = context.createImageData(image_width, image_height);
  const buffer = image_data.data;
  for (let y = 0; y < image_height; y++) {
    for (let x = 0; x < image_width; x++) {
      const index = (y * image_width + x) * 4;
      const prop = network.get_property(
        (x / image_width) * bound_x,
        (y / image_height) * bound_y,
      );
      if (prop === undefined) {
        continue;
      }
      const score = prop.score;
      buffer[index + 0] = score * 255;
      buffer[index + 1] = score * 255;
      buffer[index + 2] = score * 255;
      buffer[index + 3] = 255;
    }
  }

  context.putImageData(image_data, 0, 0);
};

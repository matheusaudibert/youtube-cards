# YouTube Cards

An SVG card generator for YouTube videos that can be easily embedded in any website or README.

_This project is inspired in [github-readme-youtube-cards](https://github.com/DenverCoder1/github-readme-youtube-cards) by [DenverCoder1](https://github.com/DenverCoder1). Thx!_

## How it works

The service receives a YouTube video ID, fetches the video data using the official YouTube API, and generates a customized SVG with the video information. The generated card is optimized for fast loading and can be styled according to your preferences.

## Usage

### Basic endpoint

```
https://youtube-cards-0wtu.onrender.com/api/:id
```

Replace `:id` with the YouTube video ID you want to display.

Example:

```markdown
![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/card?id=dQw4w9WgXcQ)
```

## Live Examples

[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/RcBNKG2X6jU)](https://youtube.com/watch?v=RcBNKG2X6jU)
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/3sJCXoxgbHQ)](https://youtube.com/watch?v=3sJCXoxgbHQ)
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/UT8Z3U5gDsc)](https://youtube.com/watch?v=UT8Z3U5gDsc)
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/v2QfOkixp4k)](https://youtube.com/watch?v=v2QfOkixp4k)
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/gE0oBIy6rMA)](https://youtube.com/watch?v=gE0oBIy6rMA)
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/J75GuCvhLAE)](https://youtube.com/watch?v=J75GuCvhLAE)

## Parameters

You can customize your card by adding the following query parameters:

| Parameter          | Default  | Description                                      |
| ------------------ | -------- | ------------------------------------------------ |
| `theme`            | `github` | Card theme (`github`, `light` or `dark`)         |
| `width`            | `250`    | Card width in pixels (min: 250, max: 1000)       |
| `border_radius`    | `5`      | Card border radius in pixels (min: 0, max: 25)   |
| `background_color` | `0d1117` | The background color of the SVG cards            |
| `title_color`      | `ffffff` | The color of the title text                      |
| `stats_color`      | `dedede` | The color of the stats text                      |
| `max_title_lines`  | `1`      | The maximum number of lines to use for the title |
| `show_duration`    | `false`  | Whether to show the duration of the videos       |

### Example with all parameters:

```markdown
[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/G9PNoGMO2-4?width=250&theme=github&max_title_lines=2&show_duration=false)](https://youtube.com/watch?v=G9PNoGMO2-4)
```

### Output:

[![YouTube Card](https://youtube-cards-0wtu.onrender.com/api/G9PNoGMO2-4?width=250&theme=github&max_title_lines=2&show_duration=false)](https://youtube.com/watch?v=G9PNoGMO2-4)

## Contribuition

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

## Support

_If you're using this repo, feel free to show support and give this repo a ⭐ star! It means a lot, thank you :)_

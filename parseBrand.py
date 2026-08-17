import sys
try:
    from pypdf import PdfReader
    reader = PdfReader(r"c:\Users\User\Desktop\mobile app\salonak\pdfs\Salonak_Brand_Identity.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    with open("brandIdentityText.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("PDF parsing success")
except Exception as e:
    print(f"Error: {e}")

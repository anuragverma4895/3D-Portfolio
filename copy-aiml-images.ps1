# Copy AI/ML project images to assets folder
$source = "C:\Users\anura\.gemini\antigravity\brain\45d2e02a-fed7-43c4-a49c-4ce8a8c9efb2"
$dest = "c:\Users\anura\Downloads\Project\3D-Portofolio\src\assets"

Copy-Item "$source\ai_text_detection_1777220544303.png" "$dest\aiml-text-detection.png" -Force
Copy-Item "$source\customer_churn_1777220560687.png" "$dest\aiml-churn-prediction.png" -Force
Copy-Item "$source\sales_analysis_1777220578306.png" "$dest\aiml-sales-analysis.png" -Force
Copy-Item "$source\rag_pipeline_1777220595459.png" "$dest\aiml-rag-pipeline.png" -Force
Copy-Item "$source\image_generator_1777220611846.png" "$dest\aiml-image-generator.png" -Force

Write-Host "All 5 AI/ML project images copied successfully!" -ForegroundColor Green

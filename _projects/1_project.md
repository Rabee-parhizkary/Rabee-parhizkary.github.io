---
layout: page
title: Autoencoder-based conditional optimal transport generative adversarial network for medical image generation
importance: 1
category: Research
---

<div style="text-align: center;">
  <img src="assets/img/architecture.png" alt="architecture" style="width:100%; max-width:600px;">
</div>

<p align="justify"> 
  We proposed an autoencoder-based GAN model for generating synthetic retina images. Our model
  has three steps: We used the model proposed in Autoencoder-based conditional optimal transport generative adversarial network for medical image
  generation by Wang(2024) with the additional step of encoding binary vessel trees independently and then generating retina images with these latent codes.
  The process starts by detecting and segmenting the blood vessels in the retinal images, producing a
  binary vessel tree. This segmentation is achieved using a U-Net-based convolutional neural network
  (CNN), which is particularly well-suited for biomedical image segmentation tasks. U-Net consists
  of downsampling and upsampling blocks that allow precise spatial localization of features while
  preserving coarse-level structures. For more details of this process, you can see towards adversarial retinal image synthesis by Costa(2017).
  Once the vessel trees are detected, the method uses an Autoencoder to translate these binary vessel
  trees into latent code. Currently, I'm working on finding an algorithm to determine the threshold for clipping singular values(You can see the exact problem in the Autoencoder-based conditional optimal transport generative adversarial network for medical image generation paper's future works.) 
</p>

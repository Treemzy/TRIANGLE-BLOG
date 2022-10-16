import os
from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import pre_delete, pre_save
from django.dispatch.dispatcher import receiver

# Create your models here.
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

        
def upload_to(instance, filename):
        return 'posts/{filename}'.format(filename=filename)
        
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)        
    image =  models.ImageField(upload_to=upload_to, blank=True, null=True)
    numLikes = models.IntegerField(null=True, blank=True, default=0)

    likes = models.IntegerField(null=True, blank=True, default=0)
    comments = models.IntegerField(null=True, blank=True, default=0)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
            
    class Meta:    
        ordering = ['-createdAt']

    def __str__(self):
        return self.title
    
    def save (self, *args, **kwargs):
        try:
            this = Post.objects.get(id=self.id)
            if this.image != self.image:
                this.image.delete()
        except: pass
        super(Post, self).save(*args, **kwargs)

def _delete_file(path):
    if os.path.isfile(path):
        os.remove(path)

@receiver(pre_delete, sender=Post)
def delete_img_pre_delete_post(sender, instance, *args, **kwargs):
    if instance.image:
        _delete_file(instance.image.path)


@receiver(pre_save, sender=Post)
def delete_file_on_change_extension(sender, instance, *args, **kwargs):
    if instance.pk:
        try:
            old_image = Post.objects.get(pk=instance.pk).image
        except Post.DoesNotExist:
            return
        else:
            new_image = instance.image
            if old_image and old_image.url != new_image.url:
                old_image.delete(save=False)



class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    class Meta:
        ordering = ['-createdAt']

    def __str__(self):
        return str(self.comment)

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    numLikes = models.IntegerField(null=True, blank=True, default=0)
    name = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.user.username)
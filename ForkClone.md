# Fork and clone 

## Steps to fork the repository (repo): 

1. Go to the main GitHub page of the repo:
    (https://github.com/gbowne1/codebooker/)
   
1. Select **Fork** button at the top right of the page. 

    ![](fork.png)

This opens a page with the heading **Create a new fork**.

     There are two fields which are required, Owner and Repository name. Make sure the owner is you and the repository name is correct. These fields should already be populated when you selected this page in step 2.

    ![](CreateFork.png)

2. Select the green **Create fork** button on the lower right hand corner of the page.

    ![](CreateForkBtn.png)

3. You now have a forked version of the original repo that is up to date with the main branch of the original repo.

    ![](ForkedBranch.png)


 #### Clone using HTTP:

    Clone this repo to your local machine using
    ```git clone https://github.com/gbowne1/codebooker.git```.

#### Clone using SSH:

    Clone this repo to your local machine using
    ```git clone git@github.com:gbowne1/codebooker.git```.


## Steps to clone the repo:

1. Open a terminal window.
2. Go to the location where you want your cloned repo to reside.

    After you have successfully cloned the repo, a new sub-directory appears in the location where you ran the clone commands. This new sub-directory has the same name as the original repo that you cloned.
 
1. Create your feature branch using ```git checkout -b my-feature```.

1. After you've made your changes to the code, commit your changes using ```git commit -m 'feat: My new feature'```.

1. Push to the branch using ```git push origin my-feature```.

1. Create a new [pull request] (SubmitPR.md).
    After the pull request is merged, you can delete your feature branch.


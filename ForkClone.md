# Fork and clone 

## Steps to fork the repository (repo): 

1. Go to the main GitHub page of the repo:
    (https://github.com/gbowne1/codebooker/)
   
1. Select **Fork** at the top right of the page. 

    ![](fork.png)

    This opens a page with the heading **Create a new fork**.

1. Review the prepopulated fields to make sure the owner is you and the repo name is correct.

    ![](CreateFork.png)

1. Select **Create fork** in the lower right corner of the page.

    ![](CreateForkBtn.png)

1. You now have a forked version of the original repo that is up to date with the master branch of the original repo.

    ![](ForkedBranch.png)

## Steps to clone the repo:

1. Open a terminal window.
1. Go to the location where you want your cloned repo to reside.
1. Clone the repo using HTTP or SSH.

    #### Clone using HTTP:

    Clone this repo to your local machine using
    ```git clone https://github.com/gbowne1/codebooker.git```.

    #### Clone using SSH:

    Clone this repo to your local machine using
    ```git clone git@github.com:gbowne1/codebooker.git```.

    After you have successfully cloned the repo, a new sub-directory appears in the location where you ran the clone repo commands. This new sub-directory has the same name as the original repo that you cloned.
 
1. Create your feature branch using ```git checkout -b my-feature```.

1. Make changes to the code.
  
1. Commit the changes using ```git commit -m 'feat: My new feature'```.

1. Push to the branch using ```git push origin my-feature```.

1. Create a new [pull request](SubmitPR.md).
    After the pull request is merged, you can delete your feature branch.


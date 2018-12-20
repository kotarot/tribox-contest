package controllers

import javax.inject._
import models._
import play.api._
import play.api.mvc._
import play.api.Play.current

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's user pages.
 */
@Singleton
class UserController @Inject() extends HomeController {

    /**
     * User pages
     */
    def user(id: String) = Action {
        Ok(views.html.user(id, getContestName, getContestDescription, getContestUrl, getFirebaseappContest, getFirebaseappContestApikey, getFirebaseappContestMessagingsenderid, getFirebaseappWca))
    }

}

export enum Nightmare {
    
    /**
     * Signals the end of the dreme. The next Dreme becomes the first child of new dreme after this one.
     */
    END_OF_DREME,

    /**
     * Signals that the current dreme should be removed.
     */
    DELETE_DREME,

    /**
     * Includes the next dreme as part of the current dreme and then ends the dreme.
     */
    INCLUDE_AND_END,

    /**
     * Ends the dreme and "consumes" the next one, skipping over it.
     */
    CONSUME_AND_END
}